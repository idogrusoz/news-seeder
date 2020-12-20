import { render } from '@testing-library/react';
import App from '../App';

test('matches the snapshot', () => {
  const wrapper = render(<App />);
  expect(wrapper).toMatchSnapshot()
});
