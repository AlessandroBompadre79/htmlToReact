import { render, screen } from '@testing-library/react';
import Collapse from './Collapse';

test('renders learn react link', () => {
  render(<Collapse />);
  const linkElement = screen.getByText(/div/i);
  expect(linkElement).toBeInTheDocument();
});
