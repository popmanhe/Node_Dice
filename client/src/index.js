/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import './favicon.ico'; // Tell webpack to load favicon.ico
//import './styles/bootstrap.css';
import './styles/font-awesome.min.css';
import './styles/toastr.css';
import './styles/morris.css';
import './styles/style.css';
import './styles/style-responsive.css';
import './styles/style-custom.css';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>, document.getElementById('app')
);
