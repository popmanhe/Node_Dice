import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import ouBetReducer from './OuBetReducer';
const rootReducer = combineReducers({
  ouBetReducer,
  routing: routerReducer
});

export default rootReducer;
