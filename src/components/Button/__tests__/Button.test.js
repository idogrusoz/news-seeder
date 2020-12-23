import { shallow } from 'enzyme';
import Button from '../Button';

describe('Button test', () => {
    it('matches the snashot', () => {
        const wrapper = shallow(<Button handleClick={jest.fn()} label="mock" />);
        expect(wrapper).toMatchSnapshot();
    });
});
