import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import ErrorBoundary from '../ErrorBoundary';

const mockHistory = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: () => mockHistory(),
    }),
}));

describe('Error boundary test', () => {
    function MockComponent(props) {
        return <h1>Error</h1>;
    }

    it('renders ErrorPage', async () => {
        const wrapper = mount(<ErrorBoundary children={<MockComponent />} />);
        wrapper.find('MockComponent').simulateError();
        await act(async () => {
            wrapper.find('Button').simulate('click');
        });
        expect(wrapper.state().hasError).not.toBeTruthy();
    });
});
