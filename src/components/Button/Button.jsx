import React from 'react';

const Button = ({ handleClick, label }) => {
    const style = {
        backgroundColor: '#37e8b8',
        border: 'none',
        color: '#fff',
        padding: '10px 15px',
        cursor: 'pointer',
        margin: '5px',
    };
    return (
        <button onClick={handleClick} style={style}>
            {label}
        </button>
    );
};

export default Button;
