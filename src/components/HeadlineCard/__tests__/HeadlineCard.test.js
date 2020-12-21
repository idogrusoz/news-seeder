import { shallow } from 'enzyme'
import HeadlineCard from '../HeadlineCard'

const mockData = {
  source: {
    id: null,
    name: "YouTube"
  },
  author: null,
  title: "mock-title",
  description: "mock-description",
  url: "https://www.mock-url.be",
  urlToImage: "https://mock-url.be/maxresdefault.jpg",
  publishedAt: "2020-12-21T08:00:30Z",
  content: null
}

describe('HeadlineCard test', () => {
  const wrapper = shallow(<HeadlineCard article={mockData} />)
  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('displays image', () => {
    const image = wrapper.find('img');
    expect(image.prop('src')).toEqual(mockData.urlToImage);
  });
  it('displays the title', () => {
    const title = wrapper.find('h3');
    expect(title.text()).toEqual(mockData.title)
  })
})

