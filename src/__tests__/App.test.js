import { mount } from 'enzyme';
import App from '../App';
import { createMemoryHistory } from 'history';

const mockLocation = jest.fn();
const mockHistory = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        pathname: () => mockLocation(),
    }),
    useHistory: () => ({
        push: () => mockHistory(),
    }),
}));

test('matches the snapshot', () => {
    const props = { history: createMemoryHistory() };
    const wrapper = mount(<App {...props} />);
    expect(wrapper).toMatchSnapshot();
});
