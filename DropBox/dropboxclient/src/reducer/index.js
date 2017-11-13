import {combineReducers} from 'redux';
import activeWindowReducer from './active-window';
import failedLoginReducer from './failedLogin';
import userDataReducer from './user-data';
//import activeUserReducer from './reducer-active-user'
const allReducers = combineReducers({
    activeWindow: activeWindowReducer,
    failedLogin: failedLoginReducer,
    userData: userDataReducer
});

export default allReducers;
