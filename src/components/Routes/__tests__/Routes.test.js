import { render } from 'enzyme';
import { createMemoryHistory } from 'history';
import Routes from '../Routes';

test('it matches the snapshot', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const wrapper = render(<Routes history={history} />);
    expect(wrapper).toMatchSnapshot();
});
