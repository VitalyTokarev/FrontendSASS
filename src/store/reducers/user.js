import { userConstants } from '../actionsTypes';

export const user = (state = [], action) => {
  switch (action.type) {
    case userConstants.ADD_USER:
        return [...state, {
            ...action.payload
        }];
    case userConstants.SET_USERS:
        return [...action.payload];
    case userConstants.UPDATE_USER:
        return state.map( user => {
            if (user._id === action.payload._id) {
                return { ...action.payload};
            }
            
            return {...user};
        });
    case userConstants.DELETE_USER:
        return state.filter( user => user._id !== action.payload);  
    default:
        return state
  }
};