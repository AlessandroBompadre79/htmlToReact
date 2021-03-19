import { render, screen } from '@testing-library/react';
import PlaceHolderComponent from './place-holder.component.js';

test('renders learn react component', () => {
  render(<PlaceHolderComponent />);
  const element = screen.getByText(/PlaceHolderElement/i);
  expect(element).toBeInTheDocument();
});