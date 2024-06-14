import { render, screen } from '@testing-library/react';
import CustomButton from '../CustomButton';

test('renders CustomButton component', () => {
    const mockFunction = jest.fn();
    render(<CustomButton label="Submit" handleClick={mockFunction} />);

    const button = screen.getByRole('button');
    button.click();

    expect(button).toBeInTheDocument();
    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(button.textContent).toBe('Submit');
});

