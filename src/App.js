import React, {Component} from 'react';
import ColorWheel from "./components/ColorWheel";

class App extends Component {
  state = {
    colors: []
  };

  render() {
    const onColorsChanged = colors => this.setState({colors});
    return (
      <div className="App">
        <ColorWheel thickness={40} numberOfThumbs={3} onColorsChanged={onColorsChanged}/>
      </div>
    );
  }
}

export default App;
