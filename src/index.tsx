import React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import { RBoard } from './app/RBoard';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<RBoard rowSize={9} colSize={9}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
