import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store'; // Import your Redux store

test('renders learn react link', () => {
  // render(<App />);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
 
  const learnElement = screen.getByText(/PVS WALLET - LOGIN/i);
  expect(learnElement).toBeInTheDocument();
});

