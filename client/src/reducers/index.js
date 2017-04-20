import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import dice from './diceReducer';
import raffle from './raffleReducer';
import chat from './chatReducer';
import user from './userReducer';
const rootReducer = combineReducers({
  dice,
  raffle,
  chat,
  user,
  routing: routerReducer
});

export default rootReducer;
