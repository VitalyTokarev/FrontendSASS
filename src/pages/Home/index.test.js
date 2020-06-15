import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import Home from './index';
import { todoCrud } from '../../store/flows';

jest.mock('react-redux');
jest.mock('../../store/flows/todo');

const updateTodo = jest.fn();
const createTodo = jest.fn();
const deleteTodo = jest.fn();

todoCrud.updateTodo.mockImplementation(updateTodo);
todoCrud.createTodo.mockImplementation(createTodo);
todoCrud.deleteTodo.mockImplementation(deleteTodo);

const todoExample = {
    _id: '1',
    value:'12345',
    type: 'Тип 1',
    fruit: 'Яблоко',
    index: 0,
};

const {
    _id,
    value,
    type,
    fruit,
} = todoExample;

const objectSelectorImplementation = todo => {
    useSelector.mockImplementation( fn => fn({
        todo:[
            todo
        ]
    }));
};

const setup = () => {
    const getTodos = jest.fn();
    todoCrud.getTodos.mockImplementation(getTodos);

    const dispatch = jest.fn();
    useDispatch.mockImplementation( () => dispatch);

    objectSelectorImplementation(todoExample);

    render(<Home/>);

    const valueInput = screen.getByRole('textbox', { name: /значение/i} ),
        typeSelectInput = screen.getByRole('textbox', { name: /тип/i} ),
        fruitSelectInput = screen.getByRole('textbox', { name: /фрукт/i} ),
        submitButton = screen.queryByRole('button', { name: /добавить/i} );

    return {
        valueInput,
        typeSelectInput,
        fruitSelectInput,
        submitButton,
        getTodos
    };
};

test('Test add todo with call dispatch.', async () => {
    const { 
        valueInput,
        typeSelectInput,
        fruitSelectInput,
        submitButton,
        getTodos
    } = setup();

    expect(getTodos).toHaveBeenCalled();

    await userEvent.type(valueInput, value);

    userEvent.click(typeSelectInput);
    userEvent.click(screen.getByRole('option', { name: type}));

    userEvent.click(fruitSelectInput);
    userEvent.click(screen.getByRole('option', { name: fruit}));

    userEvent.click(submitButton);

    expect(createTodo).toHaveBeenCalledWith({
        value,
        type,
        fruit,
    });    
});

test('Test edit todo with call dispatch.', async () => {
    const { 
        valueInput,
        typeSelectInput,
        fruitSelectInput,
        submitButton,
        getTodos
    } = setup();

    expect(getTodos).toHaveBeenCalled();

    await userEvent.type(valueInput, value);

    userEvent.click(typeSelectInput);
    userEvent.click(screen.getByRole('option', { name: type}));

    userEvent.click(fruitSelectInput);
    userEvent.click(screen.getByRole('option', { name: fruit}));

    userEvent.click(submitButton);

    expect(createTodo).toHaveBeenCalledWith({
        value,
        type,
        fruit,
    });    
});

test('Test delete user with call dispatch.', async () => {
    const { getTodos } = setup();

    expect(getTodos).toHaveBeenCalled();

    const deleteButton = screen.getByRole('button', { name: /удалить/i})
    userEvent.click(deleteButton);

    expect(deleteTodo).toHaveBeenCalledWith(_id);    
});