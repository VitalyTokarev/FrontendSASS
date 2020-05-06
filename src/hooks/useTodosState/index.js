import { useState } from 'react';

import { removeElementFromArray, getEditArray} from '../../helpers/arrayMethods';

export default ( inititalVlaue = [] ) => {
    const [todos, setTodos] = useState(inititalVlaue);

    const addTodo = (todo, _id) => {
        setTodos( state => [
            ...state,
            {
                ...todo,
                _id
            }
        ]);
    };

    const editTodo = todo => {
        const todoList = getEditArray(todo, '_id', todos);
        setTodos(todoList);
    };

    const removeTodo = _id => {
        const todoList = removeElementFromArray(_id, '_id', todos);
        setTodos(todoList);
    };

    return [
        todos,
        setTodos,
        addTodo,
        editTodo,
        removeTodo,
    ];
}