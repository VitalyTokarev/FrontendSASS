import React from 'react'
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useSelector } from 'react-redux';

import Header from './index';
import { history } from '../../helpers/constants';
import userEvent from '@testing-library/user-event';

jest.mock('react-redux');

const exampleUser = {
    name: 'banee',
    role: 'admin'
};

const useSelectorImplementation = (name = '', role = '') => {
    useSelector.mockImplementation( fn => fn({
        auth: {
            name,
            role
        }
    }));
};

const setup = (name = '', role = '') => {
    useSelectorImplementation(name, role);

    const { rerender } = render(
        <Router history={history}>
            <Header/>
        </Router>
    );

    return (name = '', role = '') => {
        useSelectorImplementation(name, role);

        rerender(
            <Router history={history}>
                <Header/>
            </Router>
        );
    };
};

test('Test cheking correct display name.', () => { 
    setup(exampleUser.name);

    expect(screen.queryByText(`Привет, ${exampleUser.name}!`)).toBeInTheDocument();
});

test('Test cheking display admin button view users.', () => {

    const rerender = setup(exampleUser.name, exampleUser.role);

    expect(screen.getByRole('button', { name: /показать пользователей/i} )).toBeInTheDocument();

    rerender(exampleUser.name, 'user');

    expect(screen.queryByRole('button', { name: /показать пользователей/i})).not.toBeInTheDocument();
});

test('Test redirect location after click on admin button view users.', () => {
    setup(exampleUser.name, exampleUser.role);

    const btnShowUsers = screen.getByRole('button', { name: /показать пользователей/i} );
    userEvent.click(btnShowUsers);

    expect(history.location.pathname).toBe('/admin_panel');
});