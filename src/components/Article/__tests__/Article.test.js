import { mount } from 'enzyme';
import { mockNews } from '../../resources/mockData';
import Article from '../Article';

describe('Article test', () => {
    const wrapper = mount(<Article article={mockNews[1]} />);
    it('Displays content safely', () => {
        const articleBody = wrapper.find('article');
        expect(articleBody.html()).not.toContain('<script>');
    });
});
