import { render, screen } from '@testing-library/react';
import Grid from './Grid';

test('renders learn react link', () => {
  render(<Grid />);
  const linkElement = screen.getByText(/table/i);
  expect(linkElement).toBeInTheDocument();
});
