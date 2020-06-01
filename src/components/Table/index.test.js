import React from 'react'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import Table from './index';

const exampleList = [
    {
        _id: '1',
        name: 'Vitaly',
        email: 'vstokarev@mail.ru',
        role: 'admin'
    },
    {
        _id: '2',
        name: 'Alex',
        email: 'alex@mail.ru',
        role: 'user'
    },
];

const exampleTableHeaders = [
    'id',
    'Имя',
    'Email',
    'Роль',
];

const headersToBeInTheTable = (headers, table) => {
    for (const header of headers) {
        const currHeader = screen.queryByRole('columnheader', { name: header } );
        expect(table).toContainElement(currHeader);
    }
};

const elementToBeInTheTable = (element, table) => {
    for (const key in element) {
        const currElement = screen.queryByRole('cell', { name: element[key] } );
        expect(table).toContainElement(currElement);
    }
};

const setup = (exampleList = [], tableHeaders) => {
    const editAction = jest.fn( id => {}),
    removeAction = jest.fn( id => {});

    render(<Table
        list={exampleList}
        editAction={editAction}
        removeAction={removeAction}
        tableHeaders={tableHeaders}
    />);

    return {
        editAction,
        removeAction
    }
};

test('Test correct display elements in table in case of absense prop headers.', () => {
    setup( [ exampleList[0] ]);
    const table = screen.getByRole('table');

    headersToBeInTheTable(Object.keys( exampleList[0] ), table);
});

test('Test correct display elements in table with prop headers.', () => {
    setup( [ exampleList[0] ], exampleTableHeaders);
    const table = screen.getByRole('table');

    headersToBeInTheTable(exampleTableHeaders, table);
});

test('Test correct display elements in table', () => {
    setup(exampleList);
    const table = screen.getByRole('table');

    for ( const element of exampleList) {
        elementToBeInTheTable(element, table);
    }

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