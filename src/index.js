import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import configStore from './store';

import App from './App';
import * as serviceWorker from './serviceWorker';

import './languages';

ReactDOM.render(<Provider store={configStore()}><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
