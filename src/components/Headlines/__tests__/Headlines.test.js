import { mount } from 'enzyme';
import Headlines from '../Headlines';
import { act } from '@testing-library/react';
import { mockNews, waitForComponentToPaint } from '../../resources/mockData';

const mockResponse = { data: { articles: mockNews } };
let mockPromise = jest.fn();
let mockCancel = jest.fn();
jest.mock('axios', () => ({
    get: () => mockPromise(),
    CancelToken: {
        source: () => {
            return {
                token: 'token',
                cancel: mockCancel,
            };
        },
    },
}));

const mockHistory = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: () => mockHistory(),
    }),
}));

describe('Headlines test', () => {
    it('renders HeadlineCard', async () => {
        delete window.location;
        window.location = { reload: jest.fn() };
        let wrapper;
        mockPromise.mockResolvedValueOnce(mockResponse);
        await act(async () => {
            wrapper = mount(<Headlines />);
        });
        expect(wrapper.find('Loader').length).not.toEqual(0);
        await waitForComponentToPaint(wrapper);
        expect(wrapper.find('HeadlineCard').length).toBeGreaterThan(1);
    });
    it('renders ErrorPage on error', async () => {
        let wrapper;
        mockPromise.mockRejectedValueOnce();
        window.location.reload = jest.fn();
        await act(async () => {
            wrapper = mount(<Headlines />);
        });
        await waitForComponentToPaint(wrapper);
        const errorPage = wrapper.find('ErrorPage');
        expect(errorPage.length).not.toBe(0);
        await act(async () => {
            errorPage.find('Button').simulate('click');
        });
        expect(window.location.reload).toBeCalled();
    });
});
