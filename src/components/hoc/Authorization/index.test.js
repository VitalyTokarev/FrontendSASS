import React from 'react'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useSelector } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Autorization from './index';


jest.mock('react-redux');

const exampleText = 'Example wrapped component',
    history = createBrowserHistory();
    
const ExampleComponent = () => {
    return (
        <div>{exampleText}</div>
    );
};

const WrappedWithHOC = Autorization(ExampleComponent);
const TestComponent = <Router history={history}><WrappedWithHOC/></Router>

const setup = loggedIn => {
    useSelector.mockImplementation( fn => fn({
        auth: {
            loggedIn
        }
    }));

    render(TestComponent);
};

test('Test checking component availability in case of successful authorization.', () => {
    setup(true);    

    expect(screen.queryByText(exampleText)).toBeInTheDocument();
});

test('Test checking component unavailability in case of unauthorized', () => {
    setup(false);

    expect(screen.queryByText(exampleText)).not.toBeInTheDocument();
});