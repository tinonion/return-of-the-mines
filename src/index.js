import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Tiles from './board/Tiles';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Tiles row_size={30} col_size={16}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
