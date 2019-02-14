import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import App from './App';
import DefaultErrorBoundary from './DefaultErrorBoundary';
import './styles.css';
import './base.less';

ReactDOM.render(
  <DefaultErrorBoundary>
    <App />
  </DefaultErrorBoundary>,
  document.getElementById('app')
);
