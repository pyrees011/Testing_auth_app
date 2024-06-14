import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../../pages/Register';

describe('Register', () => {
  test('renders the register form', () => {
    render(<Register />);
    const headingElement = screen.getByText(/register/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('updates form state when input fields change', () => {
    render(<Register />);
    const nameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('calls handleSubmit and logs formState on button click', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Register />);
    const nameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    
    expect(consoleSpy).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    consoleSpy.mockRestore();
  });

  test('renders login link', () => {
    render(<Register />);
    const loginLinkElement = screen.getByText(/already have an account/i);
    expect(loginLinkElement).toBeInTheDocument();
  });
});