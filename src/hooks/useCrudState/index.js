import { useState, useCallback } from 'react';

import useTodosState from '../../hooks/useTodosState';
import { useAuthContext } from '../../context/Auth';
import { useNotificationContext } from '../../context/Notification';

export default initialValue => {
    const [         
        todo,
        setTodos,
        addTodo,
        editTodo,
        removeTodo,
    ] = useTodosState();

    const [pathCrud] = useState(initialValue);

    const { checkAuthToken, logout } = useAuthContext();

    const { notify } = useNotificationContext();

    const createTodoAtServer = async todo => {
        if ( !await checkAuthToken() ) { return; }

        const response = await fetch(pathCrud[0], { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        if (response.ok) {
            const idTodo = await response.json();

            addTodo(todo, idTodo);
            return true;
        }

        if (response.status === 403) { logout();}

        notify('Ошибка HTTP:' + response.status);

        return false;
    };

    const getTodoFromServer = useCallback(
        async () => {
            if ( !await checkAuthToken() ) { return; }
    
            const response = await fetch(pathCrud[1]);
    
            if (response.ok) { 
                const todos = await response.json();
                
                setTodos(todos);
                return;
            } 
    
            if (response.status === 403) { logout(); }

            notify('Ошибка HTTP:' + response.status);
    
        }, 
        [logout, pathCrud, setTodos, checkAuthToken, notify]
    );

    const editTodoAtServer = async todo => {
        if ( !await checkAuthToken() ) { return; }

        const response = await fetch(pathCrud[2], { 
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        if (response.ok) {
            editTodo(todo);
            return true;
        }

        if (response.status === 403) { logout(); }

        notify('Ошибка HTTP:' + response.status);

        return false;
    };

    const deleteTodoFromServer = async id => {
        if ( !await checkAuthToken() ) { return; }

        const response = await fetch(pathCrud[3], { 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        });
        if (response.ok) {
            
            removeTodo(id);
            return true;
        }

        if (response.status === 403) { logout(); }

        notify('Ошибка HTTP:' + response.status);

        return false;

    };

    return [
        todo,
        createTodoAtServer,
        getTodoFromServer,
        editTodoAtServer,
        deleteTodoFromServer,
    ];
}