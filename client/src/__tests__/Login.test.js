import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store'; // Import your Redux store
import Login from '../pages/Login';

test('renders login form', () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );
  const emailInput = screen.getByPlaceholderText('email');
  const passwordInput = screen.getByPlaceholderText('Password');
  const loginButton = screen.getByText('LOGIN');
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});
