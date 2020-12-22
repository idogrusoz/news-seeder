import { shallow } from 'enzyme';
import HeadlineCard from '../HeadlineCard';
import { mockNews } from '../../resources/mockData';

const mockSet = jest.fn();
const mockHistory = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: () => mockHistory(),
    }),
}));

describe('HeadlineCard test', () => {
    const mock = mockNews[0];
    const mockWithNullImage = mockNews[1];
    let wrapper = shallow(<HeadlineCard article={mock} setSelected={mockSet} />);
    it('redirects to article when clicked', () => {
        wrapper.simulate('click');
        expect(mockSet).toBeCalledWith(mock);
        expect(mockHistory).toBeCalled();
    });
    it('displays image', () => {
        const image = wrapper.find('img');
        expect(image.prop('src')).toEqual(mock.urlToImage);
    });
    it('displays the title', () => {
        const title = wrapper.find('h3');
        expect(title.text()).toEqual(mock.title);
    });
    it('displays social seeder logo when image is null', () => {
        wrapper.unmount();
        mockNews.urlToImage = null;
        wrapper = shallow(<HeadlineCard article={mockWithNullImage} />);
        expect(wrapper.find('img').prop('src')).toEqual(process.env.PUBLIC_URL + '/social-seeder.jpeg');
    });
});
