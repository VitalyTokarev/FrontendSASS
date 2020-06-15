import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';

import Login from './index';
import { login } from '../../store/flows';
import { history } from '../../helpers/constants';

jest.mock('react-redux');
jest.mock('../../store/flows/auth');
const userData = {
  email: 'vstokarev@mail.ru',
  password: '123456'
};

const {
  email,
  password
} = userData;


const setup = () => {
    const loginImplementation = jest.fn();
    login.mockImplementation(loginImplementation);

    const dispatch = jest.fn();
    useDispatch.mockImplementation( () => dispatch);

    render(
      <Router history={history}>
        <Login/>
      </Router>
    );

    const emailInput = screen.getByRole('textbox', { name: /e-mail/i} ),
      passwordInput = screen.getByLabelText( /пароль/i ),
      submitButton = screen.getByRole('button', { name: /войти/i} );

    return {
      emailInput,
      passwordInput,
      submitButton,
      loginImplementation
    };
};

test('Test log in with call dispatch.', async () => {
  const { 
    emailInput,
    passwordInput,
    submitButton,
    loginImplementation
  } = setup();


  await userEvent.type(emailInput, email);
  await userEvent.type(passwordInput, password);

  userEvent.click(submitButton);

  expect(loginImplementation).toHaveBeenCalledWith({
    email,
    password,
  });    
});

test('Test validation fields in form login.', () => {
  const { 
    submitButton,
    loginImplementation
  } = setup();

  userEvent.click(submitButton);

  expect(screen.queryByText('Необходимо заполнить поле!')).toBeInTheDocument();
  expect(screen.queryByText('Почтовый адрес некорректен!'));

  expect(loginImplementation).not.toHaveBeenCalled();   
});