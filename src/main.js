import runtime from 'serviceworker-webpack-plugin/lib/runtime.js';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import App from './module/router.js'
import './main.scss';

if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}

const history = createBrowserHistory();
ReactDOM.render((
        <Router history={history}>
          <App/>
        </Router>
    ), document.getElementById('application')
);
