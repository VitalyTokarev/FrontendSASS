import React from 'react'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import Input from './index';
import { FieldHOC } from '../../helpers/utilsForTests';

const setup = (title, errorText) => {
    const WrappedComponent = FieldHOC(Input);
    render(
        <WrappedComponent
            name="value"
            title={title}
            errorText={errorText}
        />
    );
};

test('Test correct display labels for input', async () => {
    const title = 'Value',
        errorText = 'Ошибка';

    setup('Value', 'Ошибка');

    expect(screen.queryByText(title)).toBeInTheDocument();
    expect(screen.queryByText(errorText)).toBeInTheDocument();
});

test('Tets change textbox value after user input.', async () => {
    setup();
    const input = screen.getByRole('textbox'),
        value='123456';

    await userEvent.type(input, value);

    expect(input).toHaveValue(value);
});

