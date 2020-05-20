import { todoConstants } from '../actionsTypes';

const addTodo = todo => { return { type: todoConstants.ADD_TODO, payload: { ...todo } }; };

const setTodos = todos => { return { type: todoConstants.SET_TODOS, payload: todos }; };

const updateTodo = todo => { return { type: todoConstants.UPDATE_TODO, payload: {...todo} }; };

const deleteTodo = _id => { return { type: todoConstants.DELETE_TODO, payload: _id}; }

export const todoActions = {
    addTodo,
    setTodos,
    updateTodo,
    deleteTodo,
};