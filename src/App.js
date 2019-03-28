import React, { Component } from "react";
import StepOne from "./components/StepOne";

class App extends Component {
  state = {
    step: 0
  };

  getStepComponent = () => {
    return [StepOne][this.state.step];
  };

  render() {
    return (
      <div className="App" style={{ padding: "60px" }}>
        <StepOne />
      </div>
    );
  }
}

export default App;
