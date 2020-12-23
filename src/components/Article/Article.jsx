import React from 'react';
import { dateParser } from '../../utils/dateParser';
import { purify } from '../../utils/purify';
import './Article.css';
const Article = ({ article }) => {
    const { source, author, title, description, url, urlToImage, publishedAt, content } = article;
    const styles = {
        wrapper: {
            maxWidth: '800px',
            margin: '0 auto',
        },
        h1: {
            marginBottom: '5px',
        },
        h3: {
            fontWeight: 400,
            color: '#000000',
            fontSize: '12px',
            margin: '2px 5px',
        },
        h2: {
            fontWeight: 600,
            fontSize: '17px',
            textIndent: '2em',
            textAlign: 'justify',
        },
        main: {
            textAlign: 'justify',
            textIndent: '2em',
            margin: '0 2px',
            color: 'grey',
            fontSize: '17px',
        },
        textWrapper: {
            padding: '0 0.5em',
        },
    };

    return (
        <div style={styles.wrapper}>
            <img src={urlToImage || process.env.PUBLIC_URL + '/social-seeder.jpeg'} className="image" alt={title} title={content} />
            <div style={styles.textWrapper}>
                <h1 style={styles.h1}>{title}</h1>
                <h3 style={styles.h3}>Source: {source.name} </h3>
                <span style={styles.h3}>Published at: {dateParser(publishedAt)}</span>
                <h3 style={styles.h3}>Author: {author}</h3>
                <h2 style={styles.h2}>{description}</h2>
                <article style={styles.main} dangerouslySetInnerHTML={purify(content)}></article>
                <a href={url} target="_blank" rel="noreferrer">
                    Read more here
                </a>
            </div>
        </div>
    );
};

export default Article;
