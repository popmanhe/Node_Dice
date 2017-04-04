import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './containers/HomePage';
import Investment from './components/Investment';
import NotFoundPage from './components/NotFoundPage';
import Verification from './components/Verification';
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/investment" component={Investment} />
    <Route path="/Verification" component={Verification} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
