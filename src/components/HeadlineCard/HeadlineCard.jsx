import React from 'react';

//Displays top headline. Takes an article object as props and displays the basic data
const HeadlineCard = ({ article }) => {
	const { urlToImage, title, source, description } = article;
	const styles = {
		wrapper: {
			width: '350px',
			margin: '20px',
			padding: '10px',
			cursor: 'pointer',
		},
		h2: {
			margin: '0 auto',
		},
		h5: {
			margin: '5px',
			textAlign: 'center',
		},
		image: {
			width: '350px',
			height: '233px',
			objectFit: 'cover',
		},
		p: {
			textAlign: 'left',
			textIndent: '2em',
			margin: '0 2px',
		},
	};

	return (
		<div style={styles.wrapper}>
			<img src={urlToImage || process.env.PUBLIC_URL + '/social-seeder.jpeg'} alt={title} style={styles.image} />
			<h3 style={styles.h2}>{title}</h3>
			<h5 style={styles.h5}>Source: {source.name}</h5>
			<p style={styles.p}>{description}</p>
		</div>
	);
};

export default HeadlineCard;
