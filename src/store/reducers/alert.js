import { alertConstants } from '../actionsTypes';

export const alert = (state = {}, action) => {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        ...action.payload
      };
    case alertConstants.ERROR:
      return {
        message: action.payload
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
};