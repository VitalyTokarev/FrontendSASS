import React from 'react'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import Select from './index';
import { FieldHOC } from '../../helpers/utilsForTests';

const exampleOptons = ['run', 'fast']
const setup = (title, errorText, exampleOptons) => {
    const WrappedComponent = FieldHOC(Select);
    render(
        <WrappedComponent
            name="value"
            title={title}
            errorText={errorText}
            options={exampleOptons}
        />
    );
};

test('Test correct display labels for select', async () => {
    const title = 'Value',
        errorText = 'Ошибка';

    setup('Value', 'Ошибка');

    expect(screen.queryByText(title)).toBeInTheDocument();
    expect(screen.queryByText(errorText)).toBeInTheDocument();
});

test('Tets change textbox value after user input.', async () => {
    setup( '', '', exampleOptons);
    const option = screen.getByRole('option', { name: exampleOptons[0] })
    const select = screen.getByRole('combobox');

    userEvent.selectOptions(select, exampleOptons[0]);

    expect(option.selected).toBe(true);
});

