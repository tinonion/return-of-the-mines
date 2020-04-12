import React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import { RBoard } from './app/RBoard';
import { KeyboardSentinel } from "./events/KeyboardSentinel";
import * as serviceWorker from './serviceWorker';

const keyboardSentinel = new KeyboardSentinel();

ReactDOM.render(<RBoard rowSize={9} colSize={9} keyboardSentinel={keyboardSentinel}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
