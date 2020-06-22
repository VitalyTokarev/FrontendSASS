import React from 'react'
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import MySelect from './index';
import { FieldHOC } from '../../helpers/utilsForTests';

const exampleOptions = ['Type 1', 'Type2', 'Type3', 'Type4'];

const setup = (title = 'type', errorText = '') => {
    const WrappedHandleComponent = FieldHOC(MySelect);

    render( 
        <WrappedHandleComponent
            title={title}
            options={exampleOptions}
            name="type"
            errorText={errorText}
        />
    );

    const input = screen.queryByRole('textbox', { name: title });
    return {
        input
    };
};

const checkOptionsToBeInTheDocument = options => {
    options.forEach(option => {
        expect(screen.queryByText(option)).toBeInTheDocument();
    });
};

const checkOptionsNotToBeInTheDocument =  options => {
    options.forEach(option => {
        expect(screen.queryByText(option)).not.toBeInTheDocument();
    });

};

test('Test click on select to open list options', () => {
    const { input } = setup();
    
    userEvent.click(input);
    
    checkOptionsToBeInTheDocument(exampleOptions);
});


test('Test click on arrow button to open and close options', () => {
    setup();
    
    const arrowButton = screen.getByRole('button');
    
    userEvent.click(arrowButton); 
    checkOptionsToBeInTheDocument(exampleOptions);

    userEvent.dblClick(arrowButton);
    checkOptionsNotToBeInTheDocument(exampleOptions);
}); 

test('Test click outside of select with opened options.', () => {
    const { input } = setup();
    
    userEvent.click(input);
    
    act(() => {
        userEvent.click(document.body);
    });

    checkOptionsNotToBeInTheDocument(exampleOptions);
});

test('Test search options using input.', async () => {
    const { input } = setup();

    userEvent.click(input);

    await userEvent.type(input, exampleOptions[0]);
    expect(input).toHaveValue(exampleOptions[0]);

    checkOptionsToBeInTheDocument( [ exampleOptions[0] ] );
    checkOptionsNotToBeInTheDocument( exampleOptions.filter((_, index) => index !== 0));

});

test('Test click on option.', () => {
    const { input } = setup();

    userEvent.click(input);
    
    const option = screen.getByRole('option', { name: exampleOptions[1] } );

    userEvent.click(option); 

    expect(input).toHaveValue(exampleOptions[1]);
});

test('Test correct display labels for my select.', async () => {
    const title = 'Value',
        errorText = 'Ошибка';

    setup('Value', 'Ошибка');

    expect(screen.queryByText(title)).toBeInTheDocument();
    expect(screen.queryByText(errorText)).toBeInTheDocument();
});