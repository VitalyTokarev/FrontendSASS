import { combineReducers } from 'redux';

import { auth, alert, todo } from './reducers';

const rootReducer = combineReducers({
  auth,
  alert,
  todo,
});

export default rootReducer;