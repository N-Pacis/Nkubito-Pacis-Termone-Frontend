import { render, screen } from '@testing-library/react';

import Calculate from "../pages/Calculate"

test('Calculate Page', () => { 
    render(
        <>
            <Calculate />
        </>
    )
    const linkElement = screen.getByText(/Calculate/i);
    
    expect(linkElement).toBeInTheDocument();
 })