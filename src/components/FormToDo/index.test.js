import React from 'react'
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import FormToDo from './index';
import { renderWithRedux } from '../../helpers/utilsForTests';

const objectExample = {
    _id: '1',
    value: '12345',
    type: 'Тип 1',
    fruit: 'Яблоко',
    index: 0,
};

const {
    value,
    type,
    fruit,
    index,
} = objectExample;

const setup = (editObject = null) => {
    const getData = jest.fn(todo => {});

    renderWithRedux(<FormToDo getData={getData} editObject={editObject}/>);

    const valueInput = screen.getByRole('textbox', { name: /значение/i} ),
        typeSelect = screen.getByRole('textbox', { name: /тип/i} ),
        fruitSelect = screen.getByRole('textbox', { name: /фрукт/i} ),
        submitButton = screen.queryByRole('button', { name: /добавить/i} );

    return {
        valueInput,
        typeSelect,
        fruitSelect,
        submitButton,
        getData
    };
};

test('Test add valid object in form todo.', async () => {
    const {        
        valueInput,
        typeSelect,
        fruitSelect,
        submitButton,
        getData
    } = setup();

    await userEvent.type(valueInput, value);

    userEvent.click(typeSelect);
    const optionTypeSelect = screen.getByRole('option', { name: type} )
    userEvent.click(optionTypeSelect);

    userEvent.click(fruitSelect);
    const optionFruitSelect = screen.getByRole('option', { name: fruit} );
    userEvent.click(optionFruitSelect);
    
    userEvent.click(submitButton);

    expect(screen.queryByText('Необходимо заполнить поле!')).not.toBeInTheDocument();
    expect(screen.queryByText(/длинна строки меньше 5 символов/i)).not.toBeInTheDocument();
    expect(getData).toHaveBeenCalledWith(
        {
            value,
            type,
            fruit,
        }
    );
});

test('Test edit mode in form todo.', () => {
    const {
        valueInput,
        typeSelect,
        fruitSelect,
    } = setup(objectExample);
    
    expect(valueInput).toHaveValue(value);
    expect(typeSelect).toHaveValue(type);
    expect(fruitSelect).toHaveValue(fruit);

    expect(screen.queryByRole('button', { name: /редактировать/i} )).toBeInTheDocument();
    expect(screen.queryByText(`Редактировать объект №${index + 1}`)).toBeInTheDocument();
});

test('Test validation fields in form todo.', async () => {
    const {
        getData,
        valueInput,
        submitButton
    } = setup();
    
    userEvent.click(submitButton);

    const array = screen.queryAllByText('Необходимо заполнить поле!');

    if (array.length !== 3 ) {
        expect(null).toBeInTheDocument();
    }

    await userEvent.type(valueInput, 'hell');

    userEvent.click(submitButton);

    expect(screen.queryByText(/длинна строки меньше 5 символов/i)).toBeInTheDocument();
    expect(getData).not.toHaveBeenCalled();   
});