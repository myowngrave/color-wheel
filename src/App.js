import React, {Component} from 'react';
import StepOne from "./components/StepOne";

class App extends Component {
  render() {
    return (
      <div className="App" style={{padding: '60px'}}>
        <StepOne/>
      </div>
    );
  }
}

export default App;
