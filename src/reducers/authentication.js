import { authConstants } from '../helpers/constants';

const getUserFromLocalStorage = () => {
  let currUser = null;

  try {
    currUser = JSON.parse(localStorage.getItem('user'));
  } catch(e) { console.log(localStorage.getItem('user')) } 

  return currUser;
};

const user = getUserFromLocalStorage();

const initialState = user ? { loggedIn: true, user } : {};

export const autentication = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.AUTH_SUCCESS:
      return {
        loggedIn: true,
        user: { ...action.user }
      };
    case authConstants.AUTH_FAILURE:
      return {};
    case authConstants.LOGOUT:
      return {};
    default:
      return state
  }
};