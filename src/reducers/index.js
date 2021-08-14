import { combineReducers } from 'redux';
import coinReducer from './coinReducer';

const reducers = combineReducers({
  coins: coinReducer
});

export default reducers;
