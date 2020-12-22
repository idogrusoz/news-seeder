import React from 'react';

//Displays top headline. Takes an article object as props and displays the basic data
const HeadlineCard = ({ article }) => {
    const { urlToImage, title, source, description } = article;
    const styles = {
        wrapper: {
            width: '300px',
            margin: '20px',
            padding: '10px',
            cursor: 'pointer',
            fontSize: '15px',
        },
        h2: {
            margin: '0 auto',
            fontWeight: 400,
            fontSize: '16px',
        },
        h5: {
            margin: '5px',
            textAlign: 'center',
            fontWeight: 600,
            fontSize: '12px',
        },
        image: {
            width: '300px',
            height: '172px',
            objectFit: 'cover',
        },
        p: {
            textAlign: 'left',
            textIndent: '2em',
            margin: '0 2px',
            color: 'grey',
            fontSize: '13px',
        },
        span: {
            fontWeight: 400,
        },
    };

    return (
        <div style={styles.wrapper}>
            <img src={urlToImage || process.env.PUBLIC_URL + '/social-seeder.jpeg'} alt={title} style={styles.image} />
            <h3 style={styles.h2}>{title}</h3>
            <h5 style={styles.h5}>
                <span style={styles.span}>Source: </span>
                {source.name}
            </h5>
            <p style={styles.p}>{description}</p>
        </div>
    );
};

export default HeadlineCard;
