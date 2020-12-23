import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../Button/Button';

const ErrorPage = ({ onClick }) => {
    const history = useHistory();
    const handleClick = () => {
        history.push('/');
        onClick();
    };
    const styles = {
        main: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
    };
    return (
        <div style={styles.main}>
            <h1>Something went wrong</h1>
            <Button handleClick={handleClick} label="Home" />
        </div>
    );
};

export default ErrorPage;
