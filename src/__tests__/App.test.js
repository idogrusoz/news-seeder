import { render } from '@testing-library/react';
import App from '../App';
import { createMemoryHistory } from 'history';

test('matches the snapshot', () => {
    const props = { history: createMemoryHistory() };
    const wrapper = render(<App {...props} />);
    expect(wrapper).toMatchSnapshot();
});
