import React from 'react'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import List from './index';

const exampleList = [
    {
        _id: '1',
        name: 'Vitaly',
        age: 23
    },
    {
        _id: '2',
        name: 'Alex',
        age: 21
    },
    {
        _id: '3',
        name: 'Rick',
        age: 32
    }
];

const setup = (exampleList = []) => {
    const editAction = jest.fn( id => {}),
    removeAction = jest.fn( id => {});

    render(<List
        list={exampleList}
        editAction={editAction}
        removeAction={removeAction}
    />);

    return {
        editAction,
        removeAction
    }
};

test('Test correct display elements in list', () => {
    setup(exampleList);
    const list = screen.getByRole('list');

    expect(list).toContainElement(screen.queryByText(/vitaly 23/i));
    expect(list).toContainElement(screen.queryByText(/alex 21/i));
    expect(list).toContainElement(screen.queryByText(/rick 32/i));
    expect(screen.queryByText('Добавьте элементы в список!')).not.toBeInTheDocument();
});

test('Test click on edit-button.', () => {
    const { editAction } = setup([ exampleList[0]] );

    const editButton = screen.getByRole('button', { name: /редактировать/i});
    
    userEvent.click(editButton);

    expect(editAction).toHaveBeenCalledWith(exampleList[0]._id);
});

test('Test click on delete-button.', () => {
    const { removeAction } = setup( [exampleList[0]] );

    const deleteButton = screen.getByRole('button', { name: /удалить/i});
    
    userEvent.click(deleteButton);

    expect(removeAction).toHaveBeenCalledWith(exampleList[0]._id);
});

test('Test diplay empty list message.', () => {
     setup();

    expect(screen.queryByText('Добавьте элементы в список!')).toBeInTheDocument();
});