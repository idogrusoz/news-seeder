import React from 'react';
import Search from '../Search/Search';
import { useLocation, useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const NavBar = () => {
    const { pathname } = useLocation();
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const { push } = useHistory();
    const handleClick = () => {
        push('/');
    };

    const styles = {
        logo: {
            width: '180px',
            margin: '0 15px',
        },
        navBar: {
            width: '100%',
            minHeight: '70px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: isTabletOrMobile ? 'column' : 'row',
        },
        buttonWrapper: {
            width: '210px',
            textAlign: 'center',
        },
        button: {
            fontFamily: 'Roboto',
            backgroundColor: '#37e8b8',
            border: 'none',
            color: '#fff',
            padding: '10px 15px',
            cursor: 'pointer',
            margin: '5px',
        },
    };
    return (
        <section style={styles.navBar}>
            <div>
                <img
                    src="https://www.socialseeder.com/hubfs/assets/socialseeder.svg"
                    style={styles.logo}
                    alt="Logo Social Seeder"
                    title="Logo Social Seeder"
                ></img>
            </div>
            <Search />
            <div style={styles.buttonWrapper}>
                {pathname !== '/' && (
                    <button onClick={handleClick} style={styles.button}>
                        Home
                    </button>
                )}
            </div>
        </section>
    );
};

export default NavBar;
