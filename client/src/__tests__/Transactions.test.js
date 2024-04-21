import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Transactions from '../pages/Transactions/index';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('Transactions component', () => {
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

  it('should render transactions table', () => {
    render(
      <Provider store={store}>
        <Transactions />
      </Provider>
    );

    expect(screen.getByText('Transactions')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Transaction ID')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Reference Account')).toBeInTheDocument();
    expect(screen.getByText('Reference')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Deposit')).toBeInTheDocument();
    expect(screen.getByText('Transfer')).toBeInTheDocument();
  });
});
