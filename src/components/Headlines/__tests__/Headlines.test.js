import { mount } from 'enzyme';
import Headlines from '../Headlines';
import { act } from '@testing-library/react';
import { mockNews, waitForComponentToPaint } from '../../resources/mockData';

const mockResponse = { data: { articles: mockNews } };
jest.mock('axios', () => ({
    get: () => Promise.resolve(mockResponse),
    CancelToken: {
        source: () => {
            return {
                token: 'token',
                cancel: 'cancel',
            };
        },
    },
}));

describe('Headlines test', () => {
    let wrapper;
    beforeAll(async () => {
        await act(async () => {
            wrapper = mount(<Headlines />);
        });
    });
    it('renders HeadlineCard', async () => {
        expect(wrapper.find('Loader').length).not.toEqual(0);
        await waitForComponentToPaint(wrapper);
        expect(wrapper.find('HeadlineCard').length).toBeGreaterThan(1);
    });
});
