import React, {Component} from "react";
import PropTypes from "prop-types";
import {withProps} from 'recompose';
import {isMobile} from 'react-device-detect'

//region Helpers
const calculateCanvasSize = () => {
        const ratio = window.devicePixelRatio || 1,
            width = window.screen.width * ratio;
        return isMobile ? {
            ratio,
            size: width - 40
        } : {
            ratio,
            size: width * 0.1
        }
    },
    xy2polar = (x, y) => {
        let r = Math.sqrt(x * x + y * y);
        let phi = Math.atan2(y, x);
        return [r, phi];
    },
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
    }
})
class ColorWheel extends Component {
    static propTypes = {
        size: PropTypes.number.isRequired,
        ratio: PropTypes.number.isRequired,
        thickness: PropTypes.number
    };
    static defaultProps = {
        thickness: 0
    };
    ctx = null;

    initCanvas = canvas => {
        this.ctx = canvas.getContext("2d");
        this.draw();
    }
    draw = () => {
        let {size, thickness} = this.props,
            pixelPadding = 3,
            radius = size + pixelPadding,
            ctx = this.ctx,
            imageData = ctx.createImageData(2 * radius, 2 * radius);
        for (let x = -radius; x < radius; x++)
            for (let y = -radius; y < radius; y++) {
                let [r, phi] = xy2polar(x, y);
                if (r > radius) continue;
                if (thickness > 0 && r < (radius - thickness - 2 * pixelPadding)) continue;
                let deg = rad2deg(phi),
                    rowLength = 2 * radius,
                    adjustedX = x + radius,
                    adjustedY = y + radius,
                    pixelWidth = 4,
                    index = (adjustedX + (adjustedY * rowLength)) * pixelWidth;
                let hue = deg,
                    sat = r / radius,
                    // lightness = r / (2 * radius) + 1 / 2,
                    lightness = 1.0,
                    [red, green, blue] = hsl2rgb(hue, sat, lightness),
                    alpha = 255;
                imageData[index] = red;
                imageData[index + 1] = green;
                imageData[index + 2] = blue;
                imageData[index + 3] = alpha;
            }

        //create clipping path
        // ctx.fillRect(0, 0, 2 * radius, 2 * radius);
        // ctx.translate(radius, radius);
        // radius -= pixelPadding;
        // ctx.beginPath();
        // ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
        // ctx.clip();

        //fill with calculated data
        // ctx.translate(0, 0);
        ctx.putImageData(imageData, 0, 0);
    };

    render() {
        const size = this.props.size;
        return <canvas ref={this.initCanvas} width={size} height={size}/>
    }
}

export default ColorWheel;