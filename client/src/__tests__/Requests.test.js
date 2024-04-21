import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Requests from '../pages/Requests/index';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('Requests component', () => {
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

  it('should render requests tab', () => {
    render(
      <Provider store={store}>
        <Requests />
      </Provider>
    );

    expect(screen.getByText('Requests')).toBeInTheDocument();
    expect(screen.getByText('sent')).toBeInTheDocument();
    expect(screen.getByText('received')).toBeInTheDocument();
    expect(screen.getByText('Requests Funds')).toBeInTheDocument();
  });
});
