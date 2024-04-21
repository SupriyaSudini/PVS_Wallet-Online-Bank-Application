import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../pages/Profile';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('Profile component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {
        user: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
          phoneNumber: '1234567890',
          identificationType: 'Passport',
          identificationNumber: 'ABCD1234',
          address: '123 Main St',
          isVerified: true,
          isAdmin: false,
        },
      },
    });
  });

  it('should render user profile details', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Mobile')).toBeInTheDocument();
    expect(screen.getByText('Identification Type')).toBeInTheDocument();
    expect(screen.getByText('Identification Number')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Account Verified')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
  });
});
