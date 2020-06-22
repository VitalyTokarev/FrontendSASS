import React from 'react'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import BoorstrapContainer from './index';

const exampleText = 'Example wrapped component';
    
const ExampleComponent = () => {
    return (
        <div>{exampleText}</div>
    );
};

const WrappedCoponent = <BoorstrapContainer><ExampleComponent/></BoorstrapContainer>;

test('Test checking component availability in container.', () => {
    render(WrappedCoponent);
    expect(screen.queryByText(exampleText)).toBeInTheDocument();
});
