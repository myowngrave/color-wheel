import React, {Component} from 'react';
import ColorWheel from "./components/ColorWheel";

class App extends Component {
    render() {
        return (
            <div className="App">
                <ColorWheel thickness={20} numberOfThumbs={3}/>
            </div>
        );
    }
}

export default App;
