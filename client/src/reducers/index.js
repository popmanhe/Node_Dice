import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import ou from './ouBetReducer';
import chat from './chatReducer';
import user from './userReducer';
const rootReducer = combineReducers({
  ou,
  chat,
  user,
  routing: routerReducer
});

export default rootReducer;
