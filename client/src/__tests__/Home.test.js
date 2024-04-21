import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Home from '../pages/Home';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('Home component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {
        user: {
          _id: '123456',
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
          phoneNumber: '1234567890',
          identificationType: 'Passport',
          identificationNumber: 'ABCD1234',
          balance: 100,
        },
      },
    });
  });

  it('should render user profile details', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText('Hello John Doe, Welcome to PVS_Wallet')).toBeInTheDocument();
    expect(screen.getByText('Account Number')).toBeInTheDocument();
    expect(screen.getByText('123456')).toBeInTheDocument();
    expect(screen.getByText('Balance')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Mobile')).toBeInTheDocument();
    expect(screen.getByText('Identification Type')).toBeInTheDocument();
    expect(screen.getByText('Identification Number')).toBeInTheDocument();
  });
});
