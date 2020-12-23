import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import HeadlineCard from '../HeadlineCard/HeadlineCard';
import Loader from '../Loader/Loader';
import ErrorPage from '../ErrorPage/ErrorPage';

const Headlines = ({ setSelected }) => {
    const [headlines, setHeadlines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetch = useCallback(async (token) => {
        try {
            //Fetch 10 lates articles from NewsAPI
            /* Using enviroment variables to keep secrets like API_KEYs is not advised 
            However, the good practice would be storing such data in the server , since there is not
            one, API_KEY is put in the .env variables. The main purpose here is to demonstrate the knowledge
            of useing enviroment variables and basic safety measures */
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=be&pageSize=10&apiKey=${process.env.REACT_APP_API_KEY}`, {
                cancelToken: token,
            });
            setHeadlines([...response.data.articles]);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(true);
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

    // Resets the error status and allows to retry
    const onClick = () => {
        setError(false);
        window.location.reload();
    };

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
     that inicates a process on the background. 
     In case of an error error page is displayed */
    return loading ? (
        <div style={styles.loadingWrapper}>
            <Loader />
        </div>
    ) : !error ? (
        <div style={styles.newsWrapper}>
            {headlines.map((article) => {
                return <HeadlineCard article={article} key={article.url} setSelected={setSelected} />;
            })}
        </div>
    ) : (
        <ErrorPage onClick={onClick} />
    );
};

export default Headlines;
