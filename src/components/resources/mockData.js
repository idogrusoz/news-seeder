import { act } from '@testing-library/react';

export let mockNews = [
    {
        source: {
            id: null,
            name: 'YouTube',
        },
        author: null,
        title: 'mock-title',
        description: 'mock-description',
        url: 'https://www.mock-url.be',
        urlToImage: 'https://mock-url.be/maxresdefault.jpg',
        publishedAt: '2020-12-21T08:00:30Z',
        content: null,
    },
    {
        source: {
            id: null,
            name: 'YouTube',
        },
        author: null,
        title: 'mock-title',
        description: 'mock-description',
        url: 'https://www.mock-url2.be',
        urlToImage: null,
        publishedAt: '2020-12-21T08:00:30Z',
        content: 'some text <script>danger</script> [+42]',
    },
];

export const waitForComponentToPaint = async (wrapper) => {
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.update();
    });
};
