import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../../pages/Login';

describe('Login', () => {
    test('renders the login form', () => {
        render(<Login />);
        const headingElement = screen.getByText(/login/i);
        expect(headingElement).toBeInTheDocument();
    });
    
    test('updates form state when input fields change', () => {
        render(<Login />);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
    
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput).toHaveValue('john@example.com');
        expect(passwordInput).toHaveValue('password123');
    });

    test('calls handleSubmit and logs formState on button click', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        render(<Login />);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole('button', { name: /sign in/i });

        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        expect(consoleSpy).toHaveBeenCalledWith({
            email: 'john@example.com',
            password: 'password123',
        });

        consoleSpy.mockRestore();
    });
});