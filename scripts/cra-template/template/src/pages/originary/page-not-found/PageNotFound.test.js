import { render, screen } from '@testing-library/react';
import PageNotFound from './PageNotFound';

test('renders learn react link', () => {
  render(<PageNotFound />);
  const linkElement = screen.getByText(/div/i);
  expect(linkElement).toBeInTheDocument();
});
