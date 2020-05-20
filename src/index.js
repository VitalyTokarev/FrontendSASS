import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import './css/bootstrap.min.css';
import './css/index.css';
import App from './App';
import rootReducer from './store';
import { refreshTokenMiddleware } from './store/middlewares';

const store = createStore(
    rootReducer,
    applyMiddleware(
        refreshTokenMiddleware,
        thunkMiddleware,
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);