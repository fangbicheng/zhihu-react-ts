// eslint-disable
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// eslint-disable-next-line import/no-unresolved
import List from 'pages/list';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(<List />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
