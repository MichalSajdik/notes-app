import {render, screen} from '@testing-library/react';
import App from './App';
import React from 'react';

test('renders react component', () => {
  render(<App />);
  const divElement = screen.getByText(/save to reload/i);
  expect(divElement).toBeInTheDocument();
});