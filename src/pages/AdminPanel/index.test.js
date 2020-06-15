import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import AdminPanel from './index';
import { userCrud } from '../../store/flows';

jest.mock('react-redux');
jest.mock('../../store/flows/user');

const updateUser = jest.fn();
const createUser = jest.fn();
const deleteUser = jest.fn();

userCrud.updateUser.mockImplementation(updateUser);
userCrud.createUser.mockImplementation(createUser);
userCrud.deleteUser.mockImplementation(deleteUser);

const userExample = {
    _id: '1',
    name:'banee',
    email: 'bane@gmail.com',
    password: '123456',
    index: 0,
};

const {
    _id,
    name,
    email,
    password,
} = userExample;

const userSelectorImplementation = userObj => {
    useSelector.mockImplementation( fn => fn({
        user:[
            userObj
        ]
    }));
};

const setup = () => {
    const getUsers = jest.fn();
    userCrud.getUsers.mockImplementation(getUsers);

    const dispatch = jest.fn();
    useDispatch.mockImplementation( () => dispatch);

    render(<AdminPanel/>);

    const nameInput = screen.getByRole('textbox', { name: /имя/i} ),
        emailInput = screen.getByRole('textbox', { name: /e-mail/i} ),
        passwordInput = screen.getByRole('textbox', { name: /пароль/i} ),
        submitButton = screen.queryByRole('button', { name: /добавить/i} );

    return {
        nameInput,
        emailInput,
        passwordInput,
        submitButton,
        getUsers
    };
};

test('Test add user with call dispatch.', async () => {
    const { 
        nameInput,
        emailInput,
        passwordInput,
        submitButton,
        getUsers
    } = setup();

    expect(getUsers).toHaveBeenCalled();

    await userEvent.type(nameInput, name);
    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, password);

    userEvent.click(submitButton);

    expect(createUser).toHaveBeenCalledWith({
        name,
        email,
        password
    });    
});

test('Test edit user with call dispatch.', async () => {
    userSelectorImplementation(userExample);
    const { 
        nameInput,
        emailInput,
        passwordInput,
        submitButton,
        getUsers
    } = setup();

    expect(getUsers).toHaveBeenCalled();

    const editButton = screen.getByRole('button', { name: /редактировать/i})
    userEvent.click(editButton);

    await userEvent.type(nameInput, name);
    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, password);

    userEvent.click(submitButton);

    expect(updateUser).toHaveBeenCalledWith({
        _id,
        name,
        email,
        password,
    });    
});

test('Test delete user with call dispatch.', async () => {
    userSelectorImplementation(userExample);
    const { getUsers } = setup();

    expect(getUsers).toHaveBeenCalled();

    const deleteButton = screen.getByRole('button', { name: /удалить/i})
    userEvent.click(deleteButton);

    expect(deleteUser).toHaveBeenCalledWith(_id);    
});