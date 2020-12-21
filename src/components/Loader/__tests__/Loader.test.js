import { shallow } from 'enzyme';
import Loader from '../Loader.jsx';

describe('Loader test', () => {
    it('Matches the snapshot', () => {
        const wrapper = shallow(<Loader />);
        expect(wrapper).toMatchSnapshot();
    });
});
