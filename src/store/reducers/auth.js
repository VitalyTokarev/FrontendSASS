import { authConstants } from '../actionsTypes';

const getUserFromLocalStorage = () => {
  let currUser = null;

  try {
    currUser = JSON.parse(localStorage.getItem('user'));
  } catch(e) { console.log(localStorage.getItem('user')) } 

  return currUser;
};

const user = getUserFromLocalStorage();

const initialState = user ? { ...user, loggedIn: true } : {};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.AUTH_REQUEST:
      return Object.assign({}, state, { isRequest: action.payload} );
    case authConstants.AUTH_SUCCESS:
      return {
        ...action.payload,
        loggedIn: true,
      };
    case authConstants.AUTH_FAILURE:
      return {};
    case authConstants.LOGOUT:
      return {};
    default:
      return state
  }
};