import React from 'react';
import { BounceLoader } from 'react-spinners';

const Loader = () => {
    const styles = {
        wrapper: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    };
    return (
        <div style={styles.wrapper}>
            <BounceLoader color="#37e8b8" />
        </div>
    );
};

export default Loader;
