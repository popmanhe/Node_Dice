import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
//import ouBetReducer from './ouBetReducer';
import chat from './chatReducer';
import user from './userReducer';
const rootReducer = combineReducers({
 // ouBetReducer,
  chat,
  user,
  routing: routerReducer
});

export default rootReducer;
