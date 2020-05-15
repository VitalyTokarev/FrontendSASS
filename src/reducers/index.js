import { combineReducers } from 'redux';

import { autentication } from './authentication';
import { alert } from './alert';

const rootReducer = combineReducers({
  autentication,
  alert
});

export default rootReducer;