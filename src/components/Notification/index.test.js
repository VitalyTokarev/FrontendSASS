import React from 'react'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import NotificationHOC from './index';
import { useNotificationContext } from '../../context/NotificationContext';

const testString = 'test notify';

const ExampleComponent = ( { message } ) => {
    const { notify } = useNotificationContext(); 
    const onClickHandler = () => {
        notify(message);
    };
    return (
        <div>
            <button onClick={onClickHandler}/>
        </div>
    );
};

const setup = (message) => {
    const WrappedComponent = NotificationHOC(ExampleComponent);

    render(<WrappedComponent message={message}/>);

    const buttonCallNotify = screen.getByRole('button'); 
    return buttonCallNotify;
};

test('Test call notfication.', async () => {
    const buttonCallNotify = setup(testString);
    userEvent.click(buttonCallNotify);

    const notification = screen.queryByText(testString);
    expect(notification).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByText(testString));
    expect(notification).not.toBeInTheDocument();
});

test('Test double click on button that call notfication.', async () => {
    const buttonCallNotify = setup(testString);
    userEvent.dblClick(buttonCallNotify);

    expect(screen.queryByText(testString)).toBeInTheDocument();
});