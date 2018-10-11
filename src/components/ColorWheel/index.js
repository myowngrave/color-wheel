import React, {Component} from "react";
import PropTypes from "prop-types";
import {withProps} from 'recompose';
import {isMobile} from 'react-device-detect';
import styles from './styles.module.scss';

//region Helpers
const EventListenerMode = {capture: true};
const calculateCanvasSize = () => {
    const ratio = window.devicePixelRatio || 1,
      width = window.screen.width * ratio;
    return isMobile ? {
      ratio,
      size: width - 40
    } : {
      ratio,
      size: width * 0.3
    };
  },
  xy2polar = (x, y) => {
    let r = Math.sqrt(x * x + y * y);
    let phi = Math.atan2(y, x);
    return [r, phi];
  },
  polar2xy = (r, phi) => ({
    x: r * Math.cos(phi),
    y: r * Math.sin(phi)
  }),
  rad2deg = rad => ((rad + Math.PI) / (2 * Math.PI)) * 360,
  hsl2rgb = (hue, saturation, lightness) => {
    let chroma = lightness * saturation;
    let hue1 = hue / 60;
    let x = chroma * (1 - Math.abs((hue1 % 2) - 1));
    let r1, g1, b1;
    if (hue1 >= 0 && hue1 <= 1) {
      ([r1, g1, b1] = [chroma, x, 0]);
    } else if (hue1 >= 1 && hue1 <= 2) {
      ([r1, g1, b1] = [x, chroma, 0]);
    } else if (hue1 >= 2 && hue1 <= 3) {
      ([r1, g1, b1] = [0, chroma, x]);
    } else if (hue1 >= 3 && hue1 <= 4) {
      ([r1, g1, b1] = [0, x, chroma]);
    } else if (hue1 >= 4 && hue1 <= 5) {
      ([r1, g1, b1] = [x, 0, chroma]);
    } else if (hue1 >= 5 && hue1 <= 6) {
      ([r1, g1, b1] = [chroma, 0, x]);
    }

    let m = lightness - chroma;
    let [r, g, b] = [r1 + m, g1 + m, b1 + m];

    // Change r,g,b values from [0,1] to [0,255]
    return [255 * r, 255 * g, 255 * b];
  };

//endregion

@withProps(() => {
  return {
    ...(calculateCanvasSize())
  };
})
class ColorWheel extends Component {
  static propTypes = {
    size: PropTypes.number,
    ratio: PropTypes.number,
    thickness: PropTypes.number,
    numberOfThumbs: PropTypes.number,
    isConstraint: PropTypes.bool,
    onColorsChanged: PropTypes.func,
  };
  static defaultProps = {
    thickness: 0,
    numberOfThumbs: 1,
    isConstraint: true,
    onColorsChanged: () => {
    }
  };
  state = {
    initialized: false,
    canvasCenter: {x: 0, y: 0},
    thumbPosition: [],
  };
  ctx = null;
  data = null;

  constructor(props) {
    super(props);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove, EventListenerMode);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove, EventListenerMode);
  }

  onMouseMove({clientX, clientY}) {
    if (!this.state.initialized) return;

    // calculate exactly thumbs coordinates
    // mouseRadius is just a distance from mousepoint to wheel center
    let {size, numberOfThumbs, isConstraint, onColorsChanged} = this.props,
      {canvasCenter} = this.state,
      radius = size * 1.0 / 2;
    let vectorX = clientX - canvasCenter.x,
      vectorY = clientY - canvasCenter.y,
      [mouseRadius, phi] = xy2polar(vectorX, vectorY),
      thumbPosition = [],
      //     thumbPosition = polar2xy(radius, phi);
      // thumbPosition.x += radius;
      // thumbPosition.y += radius;
      increment = 2 * Math.PI / numberOfThumbs;

    let computedRadius = radius;
    if (!isConstraint && mouseRadius < radius)
      computedRadius = mouseRadius;
    computedRadius--;

    for (let i = 0; i < numberOfThumbs; i++) {
      const thumb = polar2xy(computedRadius, phi);
      thumb.x += radius;
      thumb.y += radius;
      thumbPosition.push(thumb);

      phi += increment;
    }

    // from thumbPosition, pick colors
    const data = this.data || this.ctx.getImageData(0, 0, size, size).data,
      thumbnailColors = thumbPosition.map(thumb => {
        const [x, y] = [thumb.x, thumb.y].map(Math.round),
          [r, g, b] = [0, 1, 2].map(i => data[(x + y * size) * 4 + i]);

        return {r, g, b};
      });

    this.setState({
      thumbPosition
    }, () => onColorsChanged(thumbnailColors));
  }

  initCanvas = canvas => {
    this.ctx = canvas.getContext("2d");
    // calculate canvas center fixed position
    const {size} = this.props,
      bcr = canvas.getBoundingClientRect(),
      canvasCenter = {
        x: bcr.left + size / 2,
        y: bcr.top + size / 2
      };
    this.setState({canvasCenter, initialized: true}, () => this.draw());
  };
  draw = () => {
    let {size, thickness} = this.props,
      pixelPadding = 3,
      radius = size / 2,
      ctx = this.ctx,
      imageData = ctx.createImageData(size, size),
      data = imageData.data;
    for (let x = -radius; x < radius; x++)
      for (let y = -radius; y < radius; y++) {
        let [r, phi] = xy2polar(x, y);
        if (r > radius) continue;
        if (thickness > 0 && r < (radius - thickness - pixelPadding)) continue;
        let deg = rad2deg(phi),
          adjustedX = x + radius,
          adjustedY = y + radius,
          pixelWidth = 4,
          index = (adjustedX + (adjustedY * size)) * pixelWidth;
        let hue = deg,
          sat = r / radius,
          // lightness = r / (2 * radius) + 1 / 2,
          lightness = 1.0,
          [red, green, blue] = hsl2rgb(hue, sat, lightness),
          alpha = 255;
        data[index] = red;
        data[index + 1] = green;
        data[index + 2] = blue;
        data[index + 3] = alpha;
      }

    //create clipping path
    ctx.fillRect(0, 0, 2 * radius, 2 * radius);
    ctx.translate(radius, radius);
    radius -= pixelPadding;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
    ctx.clip();

    //fill with calculated data
    // ctx.translate(0, 0);
    this.data = imageData.data;
    ctx.putImageData(imageData, 0, 0);
  };

  render() {
    const size = this.props.size,
      {thumbPosition} = this.state,
      renderThumb = thumbPos => {
        const thumbStyle = {
          top: thumbPos.y + 'px',
          left: thumbPos.x + 'px'
        };
        return <div className={styles.thumb} style={thumbStyle}/>;
      };
    return <div className={styles.container}>
      <canvas ref={this.initCanvas} width={size} height={size}/>
      {this.state.initialized && thumbPosition.map(renderThumb)}
    </div>;
  }
}

export default ColorWheel;