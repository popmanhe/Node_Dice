/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
// import routes from './routes';
import configureStore from './store/configureStore';
import './favicon.ico'; // Tell webpack to load favicon.ico
import './styles/font-awesome.min.css';
import './styles/toastr.min.css';
import './styles/style.css';
import './styles/style-responsive.css';
import './styles/style-custom.css';


import App from './containers/App';
import AdminApp from './containers/admin';
import DiceGame from './containers/DiceGame';
// import RaffleGame from './containers/RaffleGame';
import Investment from './containers/Investment';
import NotFoundPage from './containers/NotFoundPage';
import Verification from './containers/Verification';
import Stats from './containers/admin/stats';
import Users from './containers/admin/users';
import Settings from './containers/admin/settings';
import Logs from './containers/admin/logs';

import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}  >
      <Route component={App}>
        <Route path="/" component={DiceGame} />
        {/*<Route path="/raffle" component={RaffleGame} />*/}
        <Route path="/investment" component={Investment} />
        <Route path="/verification" component={Verification} />
      </Route>
      <Route component={AdminApp}>
        <Route path="/admin" component={Stats} />
        <Route path="/admin/stats" component={Stats} />
        <Route path="/admin/users" component={Users} />
        <Route path="/admin/settings" component={Settings} />
        <Route path="/admin/logs" component={Logs} />
      </Route>
      <Route path="*" component={NotFoundPage} />
    </Router>
  </Provider>, document.getElementById('app')
);
