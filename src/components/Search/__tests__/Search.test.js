import { mount } from 'enzyme';
import Search from '../Search';
import { act } from '@testing-library/react';
import { mockNews, waitForComponentToPaint } from '../../resources/mockData';

const mockResponse = { data: { articles: mockNews } };
jest.mock('axios', () => ({
    get: () => Promise.resolve(mockResponse),
    CancelToken: {
        source: () => {
            return {
                token: 'token',
                cancel: jest.fn(),
            };
        },
    },
}));
describe('Search component test', () => {
    let wrapper;
    beforeAll(async () => {
        wrapper = mount(<Search />);
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
        await waitForComponentToPaint(wrapper);
        const clear = wrapper.find('FontAwesomeIcon');
        clear.simulate('click');
        await wrapper.update();
        const input = wrapper.find('input');
        expect(input.prop('value')).toEqual('');
    });
});
