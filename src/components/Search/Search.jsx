import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Search = () => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);

    const handleChange = async (e) => {
        setInput(e.target.value);
    };

    const handleClear = () => {
        setInput('');
    };

    const fetchResults = useCallback(
        async (token) => {
            try {
                const response = await axios.get(`https://newsapi.org/v2/everything?q=${input}&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=20`, token);
                setResults([...response.data.articles]);
            } catch (error) {
                console.log(error);
            }
        },
        [input]
    );

    useEffect(() => {
        //uses axios' cancelToken API in order to prevent memory leaks once the component unmounts.
        let token = axios.CancelToken.source();
        if (input.length >= 3) {
            fetchResults(token.token);
        } else {
            setResults([]);
        }
        return () => {
            token.cancel();
        };
    }, [fetchResults, input]);

    const styles = {
        wrapper: {
            width: '350px',
            margin: 'auto',
            position: 'relative',
        },
        input: {
            border: '0 0 1px 0 solid grey',
            borderStyle: 'solid',
            borderColor: 'grey',
            borderWidth: '0 0 1px 0',
            padding: '10px 5px',
            width: '360px',
            fontFamily: 'Roboto',
            fontWeight: 400,
        },
        results: {
            width: '360px',
            zIndex: 1,
            position: 'absolute',
            maxHeight: '400px',
            overflow: 'auto',
            WebkitBoxShadow: '1px 10px 11px -1px rgba(0,0,0,0.49)',
            boxShadow: '1px 10px 11px -1px rgba(0,0,0,0.49)',
            padding: '0 5px',
            scrollbarWidth: 'thin',
            backgroundColor: '#ffffff',
        },
        singleResult: {
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: 14,
            cursor: 'pointer',
        },
        icon: {
            position: 'absolute',
            top: '10px',
            right: '0px',
        },
        clear: {
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.wrapper}>
            <input value={input} onChange={handleChange} placeholder="Search news by topic" style={styles.input} />
            <div style={styles.icon}>
                {input.length === 0 ? <FontAwesomeIcon icon={faSearch} /> : <FontAwesomeIcon icon={faTimes} onClick={handleClear} style={styles.clear} />}
            </div>
            <div style={styles.results}>
                {results.length > 0 &&
                    results.map((article) => {
                        return (
                            <p style={styles.singleResult} key={article.url}>
                                {article.title}
                            </p>
                        );
                    })}
            </div>
        </div>
    );
};

export default Search;
