import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';

import Signup from './index';
import { signup } from '../../store/flows';
import { history } from '../../helpers/constants';

jest.mock('react-redux');
jest.mock('../../store/flows/auth');

const userData = {
  email: 'vstokarev@mail.ru',
  password: '123456',
  name: 'DarkWit',
};

const {
  email,
  password,
  name
} = userData;


const setup = () => {
    const signupImplementation = jest.fn();
    signup.mockImplementation(signupImplementation);

    const dispatch = jest.fn();
    useDispatch.mockImplementation( () => dispatch);

    render(
      <Router history={history}>
        <Signup/>
      </Router>
    );

    const emailInput = screen.getByRole('textbox', { name: /e-mail/i} ),
      passwordInput = screen.getByRole('textbox', {name: /пароль/i} ),
      nameInput = screen.getByRole('textbox', { name: /имя/i} ),
      submitButton = screen.getByRole('button', { name: /зарегистрироваться/i} );

    return {
      emailInput,
      passwordInput,
      nameInput,
      submitButton,
      signupImplementation
    };
};

test('Test sign up with call dispatch.', async () => {
  const { 
    emailInput,
    passwordInput,
    nameInput,
    submitButton,
    signupImplementation
  } = setup();


  await userEvent.type(emailInput, email);
  await userEvent.type(passwordInput, password);
  await userEvent.type(nameInput, name);

  userEvent.click(submitButton);

  expect(signupImplementation).toHaveBeenCalledWith({
    email,
    password,
    name
  });    
});

test('Test validation fields in form signup.', async () => {
  const { 
    nameInput,
    passwordInput,
    submitButton,
    signupImplementation
  } = setup();

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

  expect(signupImplementation).not.toHaveBeenCalled();   
});