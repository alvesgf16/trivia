import { combineReducers } from 'redux';
import login from './login';
import timer from './timer';

const rootReducer = combineReducers({ login, timer });

export default rootReducer;
