import { mount } from 'enzyme';
import ErrorPage from '../ErrorPage';

const mockHistory = jest.fn();
const mockClick = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: () => mockHistory(),
    }),
}));

describe('ErrorPage test', () => {
    it('redirects to main page', () => {
        const wrapper = mount(<ErrorPage onClick={mockClick} />);
        const button = wrapper.find('Button');
        button.simulate('click');
        expect(mockHistory).toBeCalled();
        expect(mockClick).toBeCalled();
    });
});
