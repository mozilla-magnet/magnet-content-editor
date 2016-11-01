import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './containers/Root';
import './index.css';
import configureStore from './store/configureStore';

localStorage.setItem('api', JSON.stringify({"host":"http://localhost:3000","auth": "test"}));

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

// For fb.me/react-devtools
window.react = React;

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);

