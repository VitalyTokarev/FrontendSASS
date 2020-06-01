import React, { useState } from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../store';
import { refreshTokenMiddleware } from '../store/middlewares';

const store = createStore(
    rootReducer,
    applyMiddleware(
        refreshTokenMiddleware,
        thunkMiddleware,
    )
);

export const renderWithRedux = (UI, initialStore = store) => {
    return { ...render(
    <Provider store={initialStore}>
        {UI}
    </Provider>)}
};

export const FieldHOC = WrappedComponent => {
    return props => {
        const [value, setValue] = useState('');

        const handleChange = jest.fn( event => {
            setValue(event.target.value);
        });

        return <WrappedComponent 
            {...props} 
            value={value}
            handleChange={handleChange}
        />
    };
};