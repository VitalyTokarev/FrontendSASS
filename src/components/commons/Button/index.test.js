import React from 'react'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import Button from './index';

const setup = disabled => {
    const handleClick = jest.fn( event => {});

    const { rerender } = render(<Button
        handleOnClick={handleClick}
        name='Добавить'
        disabled={disabled}
    />);

    const button = screen.getByRole('button', { name: /добавить/i } );
    const rerenderFucntion = disabled => {
        rerender(
            <Button
                handleOnClick={handleClick}
                name='Добавить'
                disabled={disabled}
            />
     );  
    }

    return {
        rerender: rerenderFucntion,
        button,
        handleClick
    }
};

test('Test checking the click event handler.', async () => {
    const { handleClick, button } = setup(false);

    userEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
});

test('Test cheking disabled button.', async () => {
    const { rerender, button }  = setup(true);
    
    expect(button).toBeDisabled();

    rerender(false);

    expect(button).toBeEnabled();
});

