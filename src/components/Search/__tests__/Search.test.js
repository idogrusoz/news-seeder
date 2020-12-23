import { mount } from 'enzyme';
import Search from '../Search';
import { act } from '@testing-library/react';
import { mockNews, waitForComponentToPaint } from '../../resources/mockData';

const mockResponse = { data: { articles: mockNews } };
let mockPromise = jest.fn();
jest.mock('axios', () => ({
    get: () => mockPromise(),
    CancelToken: {
        source: () => {
            return {
                token: 'token',
                cancel: jest.fn(),
            };
        },
    },
}));

const mockLocation = jest.fn();
const mockHistory = jest.fn();
const mockSetSelected = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        pathname: () => mockLocation(),
    }),
    useHistory: () => ({
        push: () => mockHistory(),
    }),
}));

describe('Search component test', () => {
    let wrapper;
    beforeEach(async () => {
        mockPromise.mockResolvedValueOnce(mockResponse);
        wrapper = mount(<Search setSelected={mockSetSelected} />);
        const input = wrapper.find('input');
        await act(async () => {
            input.simulate('change', { target: { value: 'var' } });
        });
    });
    it('displays search results', async () => {
        await waitForComponentToPaint(wrapper);
        const results = wrapper.find('p');
        expect(results.length).not.toBe(0);
    });
    it('clears input on click', async () => {
        const clear = wrapper.find('FontAwesomeIcon');
        clear.simulate('click');
        await wrapper.update();
        const input = wrapper.find('input');
        expect(input.prop('value')).toEqual('');
    });
    it('redirects when a result is clicked', async () => {
        const input = wrapper.find('input');
        await act(async () => {
            input.simulate('change', { target: { value: 'var' } });
        });
        await waitForComponentToPaint(wrapper);
        const results = wrapper.find('p').at(0);
        results.simulate('click');
        expect(mockHistory).toBeCalled();
    });
});
describe('Search Error test', () => {
    it('renders Error Component', async () => {
        mockPromise.mockRejectedValueOnce(new Error('mockError'));
        const wrapper = await mount(<Search setSelected={mockSetSelected} />);
        const input = wrapper.find('input');
        await act(async () => {
            input.simulate('change', { target: { value: 'var' } });
        });
        await waitForComponentToPaint(wrapper);
        const errorPage = wrapper.find('ErrorPage');
        await act(async () => {
            errorPage.find('Button').simulate('click');
        });
        await waitForComponentToPaint(wrapper);
        expect(input.prop('value')).toEqual('');
        expect(mockHistory).toBeCalled();
    });
});
