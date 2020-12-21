import { shallow } from 'enzyme';
import HeadlineCard from '../HeadlineCard';
import { mockNews } from '../../resources/mockData';

describe('HeadlineCard test', () => {
    const mock = mockNews[0];
    const mockWithNullImage = mockNews[1];
    let wrapper = shallow(<HeadlineCard article={mock} />);
    it('matches the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
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
