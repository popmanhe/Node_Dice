import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
//import ouBetReducer from './ouBetReducer';
import chat from './chatReducer';
const rootReducer = combineReducers({
 // ouBetReducer,
  chat,
  routing: routerReducer
});

export default rootReducer;
