import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../redux/store'; // Import your Redux store
import Register from '../pages/Register'; // Import your Register component

test('renders register form', () => {
    render(
        <Provider store={store}>
          <MemoryRouter>
            <Register />
          </MemoryRouter>
        </Provider>
      );

  const firstNameInput = screen.getByLabelText('First Name');
  const lastNameInput = screen.getByLabelText('Last Name');
  const emailInput = screen.getByLabelText('Email');
  const mobileInput = screen.getByLabelText('Mobile');
  const identificationNumberInput = screen.getByLabelText('Identification Number');
  const addressInput = screen.getByLabelText('Address');
  const passwordInput = screen.getByLabelText('Password');
  const confirmPasswordInput = screen.getByLabelText('Confirm Password');
  const registerButton = screen.getByText('Register');

  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(mobileInput).toBeInTheDocument();
  expect(identificationNumberInput).toBeInTheDocument();
  expect(addressInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(confirmPasswordInput).toBeInTheDocument();
  expect(registerButton).toBeInTheDocument();
});
