import { todoConstants } from '../actionsTypes';

export const todo = (state = [], action) => {
  switch (action.type) {
    case todoConstants.ADD_TODO:
        return [...state, {
            ...action.payload
        }];
    case todoConstants.SET_TODOS:
        return [...action.payload];
    case todoConstants.UPDATE_TODO:
        return state.map( todo => {
            if (todo._id === action.payload._id) {
                return { ...action.payload};
            }
            
            return {...todo};
        });
    case todoConstants.DELETE_TODO:
        return state.filter( todo => todo._id !== action.payload);  
    default:
        return state
  }
};