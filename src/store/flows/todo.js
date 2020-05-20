import { entityService } from '../../helpers/entityService';
import { todoActions, alertActions } from '../actions';
import { todoConstants } from '../actionsTypes';

const createTodo = todo => {
    return dispatch => {
        dispatch(alertActions.clear());
        entityService.createEntityAtServer('/object/create', todo)
        .then(
            _id => { 
                dispatch(todoActions.addTodo({
                    ...todo,
                    _id
                }));
                dispatch(alertActions.success({
                    type: todoConstants.ADD_TODO,
                    message: 'Объект добавлен!'
                }));
            },
            error => {
                dispatch(alertActions.error(error));
            }
        );
    };
};

const getTodos = () => {
    return dispatch => {
        dispatch(alertActions.clear());
        entityService.getEntityFromServer('/object')
        .then(
            todos => {
                dispatch(todoActions.setTodos(todos));
            },
            error => {
                dispatch(alertActions.error(error));
            }
        );
    };
};

const updateTodo = todo => {
    return dispatch => {
        dispatch(alertActions.clear());
        entityService.editEntityAtServer('/object/update', todo)
        .then(
            () => { 
                dispatch(todoActions.updateTodo(todo));
                dispatch(alertActions.success({
                    type: todoConstants.UPDATE_TODO,
                    message: 'Объект обновлен!'
                }));
            },
            error => {
                dispatch(alertActions.error(error));
            }
        );
    };
};

const deleteTodo = id => {
    return dispatch => {
        dispatch(alertActions.clear());
        entityService.deleteEntityFromServer('/object/delete', id)
        .then(
            () => { 
                dispatch(todoActions.deleteTodo(id));
                dispatch(alertActions.success({
                    type: todoConstants.ADD_TODO,
                    message: 'Объект удален!'
                }));
            },
            error => {
                dispatch(alertActions.error(error));
            }
        );
    };
};

export const todoCrud = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
};