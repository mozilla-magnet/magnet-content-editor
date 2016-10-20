import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import ApiUtils from './lib/ApiUtils';
import AppRouter from './AppRouter';
import { browserHistory, hashHistory } from 'react-router';

function initApiClientInfo() {
  localStorage.clear();
  localStorage.setItem('api', JSON.stringify({
    host: 'http://localhost:3000',
    auth: 'test',
  }));
}

initApiClientInfo();

// For fb.me/react-devtools
window.react = React;

// NOTE:SG: Have to use hashHistory, or have it changed in each 'action' that
// uses history to navigate.  Maybe we create a module to pick history so it's
// determined in once place
ReactDOM.render(
  <AppRouter history={hashHistory}/>,
  document.getElementById('root')
);
