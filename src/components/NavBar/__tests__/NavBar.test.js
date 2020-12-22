import { mount } from 'enzyme';
import NavBar from '../NavBar';

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

describe('NavBar test', () => {
    it('returns home screen when clicked on the buton', async () => {
        mockLocation.mockReturnValue('/article');
        const wrapper = mount(<NavBar />);
        const button = wrapper.find('button');
        button.simulate('click');
        expect(mockHistory).toBeCalled();
    });
});
