import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import HeadlineCard from '../HeadlineCard/HeadlineCard';
import Loader from '../Loader/Loader';

const Headlines = ({ setSelected }) => {
    const [headlines, setHeadlines] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetch = useCallback(async (token) => {
        try {
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=be&pageSize=10&apiKey=${process.env.REACT_APP_API_KEY}`, token);
            setHeadlines([...response.data.articles]);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        //uses axios' cancelToken API in order to prevent memory leaks once the component unmounts.
        let token = axios.CancelToken.source();
        setLoading(true);
        fetch(token.token);
        return () => {
            token.cancel('Headline fetch cancelled');
        };
    }, [fetch]);

    const styles = {
        newsWrapper: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
        },
        loadingWrapper: {
            height: '100vh',
        },
    };

    /*While the data is being fetched from the API, user sees the loader component
     that inicates a process on the background */
    return loading ? (
        <div style={styles.loadingWrapper}>
            <Loader />
        </div>
    ) : (
        <div style={styles.newsWrapper}>
            {headlines.map((article) => {
                return <HeadlineCard article={article} key={article.url} setSelected={setSelected} />;
            })}
        </div>
    );
};

export default Headlines;
