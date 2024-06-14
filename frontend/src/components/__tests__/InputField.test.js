import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from '../InputField';

test('renders InputField component', () => {
    const mockFunction = jest.fn();
    render(<InputField value="" label="username" handleChange={mockFunction} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'testuser', name: 'username' } });

    expect(input).toBeInTheDocument();
    expect(mockFunction).toHaveBeenCalledTimes(1);
    // expect(input.value).toBe('testuser');
});
