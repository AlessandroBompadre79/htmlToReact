import { render, screen } from '@testing-library/react';
import Table from './Table';

test('renders learn react link', () => {
  render(<Table />);
  const linkElement = screen.getByText(/table/i);
  expect(linkElement).toBeInTheDocument();
});
