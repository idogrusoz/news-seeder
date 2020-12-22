import { useMediaQuery } from '@material-ui/core';
import { mount, shallow } from 'enzyme';
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

const mockView = jest.fn();

jest.mock('react-responsive', () => ({
    useMediaQuery: () => ({
        isTabletOrMobile: () => mockView,
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
    it('displays as a column in smaller screens', () => {
        mockView.mockReturnValue(true);
        const wrapper = shallow(<NavBar />);
        const bar = wrapper.find('section');
        expect(bar.prop('style').flexDirection).toEqual('column');
    });
});
