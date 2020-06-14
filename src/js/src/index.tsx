import React from 'react';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';

import RApp from "./app/RApp";

import "./fonts/MineSweeper-1.ttf";
import "./fonts/MineSweeper-1.otf";

ReactDOM.render(<RApp/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
