import xss from 'xss';

const options = {
    whiteList: xss.whiteList,
};

//removes unnecessary chunk from string e.g.[+444 chars]
const shorten = (text) => {
    const index = text.indexOf('[+');
    return text.slice(0, index);
};

export const purify = (text) => {
    /* Remove dangerous tags like <script> from string
    to prevent xss attacks*/
    const purified = xss(text, options);
    return { __html: shorten(purified) };
};
