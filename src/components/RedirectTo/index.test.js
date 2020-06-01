import React from 'react'
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import RedirectTo from './index';
import { history } from '../../helpers/constants';

const setup = pathTo => {
    render(
        <Router history={history}>
            <RedirectTo pathTo={pathTo}/>
        </Router>
    );
};

test('Test default redirect to home.', () => {
    setup();

    expect(history.location.pathname).toBe('/');
});

test('Test redirect to props location.', () => {
    const path = '/users';
    setup(path);

    expect(history.location.pathname).toBe(path);
});