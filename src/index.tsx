import React from 'react';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';

import RApp from "./app/RApp";

import "./fonts/Minesweeper1-Regular.ttf";
import "./fonts/Minesweeper1-Regular.woff";
import "./fonts/Minesweeper1-Regular.otf";
import "./fonts/FiraSans-Medium.ttf";

ReactDOM.render(<RApp/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
