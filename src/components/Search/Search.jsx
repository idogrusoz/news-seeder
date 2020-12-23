import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ErrorPage from '../ErrorPage/ErrorPage';

const Search = ({ setSelected }) => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(false);

    const history = useHistory();
    //creates a reference to detect the search component in the DOM
    const searchRef = useRef();

    //handles the user input
    const handleChange = async (e) => {
        setInput(e.target.value);
    };

    // Clears user input from the search bar
    const handleClear = () => {
        setInput('');
    };

    const fetchResults = useCallback(
        async (token) => {
            try {
                //Fetch articles those match with input value
                /* Using enviroment variables to keep secrets like API_KEYs is not advised 
            However, the good practice would be storing such data in the server , since there is not
            one, API_KEY is put in the .env variables. The main purpose here is to demonstrate the knowledge
            of useing enviroment variables and basic safety measures */
                const response = await axios.get(`https://newsapi.org/v2/everything?q=${input}&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=20`, {
                    cancelToken: token,
                });
                setResults([...response.data.articles]);
            } catch (err) {
                if (err.message) {
                    setError(true);
                }
            }
        },
        [input]
    );

    // Makes sure that in case that user clicks outside the search bar, search results are removed from the screen
    const pageClick = useCallback((e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            handleClear();
        }
    }, []);

    useEffect(() => {
        setError(false);
        // Adds event listener to catch click events on the page
        window.addEventListener('mousedown', pageClick, false);
        // Uses axios' cancelToken API in order to prevent memory leaks once the component unmounts.
        let token = axios.CancelToken.source();
        if (input.length >= 3) {
            // Calls the API on every change of user input as long as it is longer han 3 chars
            fetchResults(token.token);
        } else {
            setResults([]);
        }
        return () => {
            token.cancel();
        };
    }, [fetchResults, input, pageClick]);

    /* When user clicks on an article 
    it clears the input and results field, changes parent state for to selected article
    and navifgates user to proper page*/
    const handleClick = (article) => {
        handleClear();
        setSelected(article);
        history.push('/article');
    };

    // Function passed to ErrorPage to clear
    const handleError = () => {
        handleClear();
        setError(false);
    };

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
            width: '350px',
            fontWeight: 400,
        },
        results: {
            width: '350px',
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
        <div style={styles.wrapper} ref={searchRef}>
            <input value={input} onChange={handleChange} placeholder="Search news by topic" style={styles.input} />
            <div style={styles.icon}>
                {/* When inut field is empty a magnifier icon is displayed and repleaced by a clickable 'X' once the user starts to type */}
                {input.length === 0 ? <FontAwesomeIcon icon={faSearch} /> : <FontAwesomeIcon icon={faTimes} onClick={handleClear} style={styles.clear} />}
            </div>
            <div style={styles.results}>
                {!error ? (
                    results.length > 0 &&
                    results.map((article) => {
                        return (
                            <p style={styles.singleResult} key={article.url + article.title} onClick={() => handleClick(article)}>
                                {article.title}
                            </p>
                        );
                    })
                ) : (
                    <ErrorPage onClick={handleError} />
                )}
            </div>
        </div>
    );
};

export default Search;
