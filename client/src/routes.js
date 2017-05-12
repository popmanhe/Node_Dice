import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import DiceGame from './containers/DiceGame';
// import RaffleGame from './containers/RaffleGame';
import Investment from './components/Investment';
import NotFoundPage from './components/NotFoundPage';
import Verification from './components/Verification';
export default (
  <Route path="/" component={App}>
    <IndexRoute component={DiceGame} />
    {/*<Route path="/raffle" component={RaffleGame} />*/}
    <Route path="/investment" component={Investment} />
    <Route path="/verification" component={Verification} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
