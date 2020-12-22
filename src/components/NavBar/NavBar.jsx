import React from 'react';
import Search from '../Search/Search';
import { useLocation, useHistory } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ setSelected }) => {
    const { pathname } = useLocation();
    const { push } = useHistory();
    const handleClick = () => {
        push('/');
    };

    const styles = {
        logo: {
            width: '180px',
            margin: '0 15px',
        },
        navBar: {},
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
        <section className="nav-bar">
            <div>
                <img
                    src="https://www.socialseeder.com/hubfs/assets/socialseeder.svg"
                    style={styles.logo}
                    alt="Logo Social Seeder"
                    title="Logo Social Seeder"
                ></img>
            </div>
            <Search setSelected={setSelected} />
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
