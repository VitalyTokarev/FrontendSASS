import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import FormToDo from '../../components/FormToDo';
import List from '../../components/List';
import Header from '../../components/Header';
import { getEditElement } from '../../helpers/arrayMethods';
import { todoCrud } from '../../store/flows';
import { getAlertMessageType } from '../../helpers/getEntityFromState';
import { todoConstants } from '../../store/actionsTypes';

const INITIAL_EDIT_STATE = {
    removeButtonDisabled: false,
    editObject: null,
};

const Home = () => {
    const [editState, setEditState] = useState(INITIAL_EDIT_STATE);

    const dispatch = useDispatch();

    const todos = useSelector( state => state.todo, shallowEqual);

    const messageSuccessType = useSelector(getAlertMessageType, shallowEqual);

    const boundGetTodos = useCallback( 
        () => dispatch(todoCrud.getTodos()
        ), 
        [dispatch]
    );

    const boundCreateTodo = useCallback( 
        todo => dispatch(todoCrud.createTodo(todo)
        ), 
        [dispatch]
    );

    const boundEditTodo = useCallback(
        todo => dispatch(todoCrud.updateTodo(todo)
        ),
        [dispatch]
    );

    const boundDeleteTodo = useCallback(
        id => dispatch(todoCrud.deleteTodo(id)
        ),
        [dispatch]
    );
    
    useEffect(() => {
        boundGetTodos();
    }, [boundGetTodos]);

    useEffect(() => {
        if ( messageSuccessType === todoConstants.UPDATE_TODO ) {
            setEditState({
                removeButtonDisabled: false,
                editTodo: null,
            });
        }
    }, [messageSuccessType])

    const getEditTodoId = useCallback(
        id => {
            const editTodo = getEditElement(id, '_id', todos);
            setEditState({
                removeButtonDisabled: true,
                editTodo,
            });
        }, 
        [todos]
    );

    const getData = useCallback(
        todo => {
            if (editState.editObject !== null) {
                boundEditTodo(todo);
            } else {
                boundCreateTodo(todo);
            }
        }, 
        [boundCreateTodo, boundEditTodo, editState.editObject]
    );
   
    return (
        <React.Fragment>
            <Header/>
            <FormToDo
                getData={getData}
                editObject={editState.editTodo}
            />
            <List
                list={todos}
                removeAction={boundDeleteTodo}
                editAction={getEditTodoId}
                removeButtonDisabled={editState.removeButtonDisabled}
            />
        </React.Fragment>
    );
};

export default Home;