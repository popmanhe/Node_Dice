import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import ouBetReducer from './ouBetReducer';
import chatReducer from './chatReducer';
const rootReducer = combineReducers({
  ouBetReducer,
  chatReducer,
  routing: routerReducer
});

export default rootReducer;
