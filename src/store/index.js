import { combineReducers } from 'redux';

import { auth, alert, todo, user } from './reducers';

const rootReducer = combineReducers({
  auth,
  alert,
  todo,
  user
});

export default rootReducer;