import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import { mockNews } from '../../resources/mockData';
import Routes from '../Routes';

describe('Routes test', () => {
    it('renders Headlines on root', () => {
        const history = createMemoryHistory({ initialEntries: ['/'] });
        const wrapper = mount(<Routes history={history} />);
        expect(wrapper.find('Headlines').length).toBeGreaterThan(0);
    });
    it('renders Articles on /articles root', () => {
        const history = createMemoryHistory({ initialEntries: ['/article'] });
        const wrapper = mount(<Routes history={history} selected={mockNews[0]} />);
        expect(wrapper.find('Article').length).toBeGreaterThan(0);
    });
    it('renders ErrorPage when article is null', () => {
        const history = createMemoryHistory({ initialEntries: ['/article'] });
        const wrapper = mount(<Routes history={history} selected={null} />);
        expect(wrapper.find('ErrorPage').length).toBeGreaterThan(0);
    });
});
