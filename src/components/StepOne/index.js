import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import ColorWheel from "../ColorWheel";

import styles from "./styles.module.scss";
import { polar2xy } from "../../helpers";

@withTranslation()
class StepOne extends Component {
  state = {
    colors: []
  };

  renderEars = ({ thumbPosition, thumbColors }) => {
    const { t } = this.props;
    return (
      <div>
        {thumbPosition.map((position, index) => {
          const backgroundColor = thumbColors[index].hex,
            { x, y } = polar2xy(25, Math.PI - position.phi);
          const earStyle = {
            backgroundColor,
            transform: `translate(${x}px, ${y}px)`
          };
          return <div className={styles.ear} style={earStyle} />;
        })}
        <div className={styles.started} />,{" "}
        <div>
          <h1>{t("colorWheel")}</h1>
          <p>{t("clickToGetStarted")}</p>
        </div>
      </div>
    );
  };

  render() {
    const onColorsChanged = colors => this.setState({ colors });
    return (
      <div>
        <ColorWheel
          thickness={30}
          numberOfThumbs={3}
          onColorsChanged={onColorsChanged}
          renderScoped={this.renderEars}
        />
      </div>
    );
  }
}

export default StepOne;
