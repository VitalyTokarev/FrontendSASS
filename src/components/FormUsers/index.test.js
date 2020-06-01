import React from 'react'
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import FormUsers from './index';
import { renderWithRedux } from '../../helpers/utilsForTests';

const userExample = {
    _id: '1',
    name:'banee',
    email: 'bane@gmail.com',
    password: '123456',
    index: 0,
};

const {
    name,
    email,
    password,
    index,
} = userExample;

const setup = (editUser = null) => {
    const getData = jest.fn( user => {});

    renderWithRedux(<FormUsers getData={getData} editUser={editUser}/>);

    const nameInput = screen.getByRole('textbox', { name: /имя/i} ),
        emailInput = screen.getByRole('textbox', { name: /e-mail/i} ),
        passwordInput = screen.getByRole('textbox', { name: /пароль/i} ),
        submitButton = screen.queryByRole('button', { name: /добавить/i} );

    return {
        getData,
        nameInput,
        emailInput,
        passwordInput,
        submitButton
    };
};

test('Test add valid user in form todo.', async () => {
    const {
        getData,
        nameInput,
        emailInput,
        passwordInput,
        submitButton
    } = setup();

    await userEvent.type(nameInput, name);
    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, password);
    
    userEvent.click(submitButton);

    expect(screen.queryByText('Необходимо заполнить поле!')).not.toBeInTheDocument();
    expect(screen.queryByText(/длинна имени меньше/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/длинна пароля меньше/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Почтовый адрес некорректен/i)).not.toBeInTheDocument();

    expect(getData).toHaveBeenCalledWith({
        name,
        email,
        password,
    });
});

test('Test edit mode in form users.', () => {
    const {
        nameInput,
        emailInput,
        passwordInput,
    } = setup(userExample);

    expect(nameInput).toHaveValue(name);
    expect(emailInput).toHaveValue(email);
    expect(passwordInput).not.toHaveValue();

    expect(screen.queryByRole('button', { name: /редактировать/i} )).toBeInTheDocument();
    expect(screen.queryByText(`Редактировать пользователя №${index + 1}`)).toBeInTheDocument();
});

test('Test validation fields in form users.', async () => {
    const {
        getData,
        nameInput,
        passwordInput,
        submitButton
    } = setup()

    userEvent.click(submitButton);

    const array = screen.queryAllByText('Необходимо заполнить поле!');

    if (array.length !== 2 ) {
        expect(null).toBeInTheDocument();
    }
    expect(screen.queryByText('Почтовый адрес некорректен!'));

    await userEvent.type(nameInput, 'bane');
    await userEvent.type(passwordInput, '12345')

    userEvent.click(submitButton);

    expect(screen.queryByText(/длинна имени меньше 5 символов/i)).toBeInTheDocument();
    expect(screen.queryByText(/длинна пароля меньше 6 символов/i)).toBeInTheDocument();
    expect(getData).not.toHaveBeenCalled();   
});