import React from 'react';
import Search from '../Search/Search';
import { useLocation, useHistory } from 'react-router-dom';
import './NavBar.css';
import Button from '../Button/Button';

const NavBar = ({ setSelected }) => {
    const { pathname } = useLocation();
    const { push } = useHistory();
    // OnClick function for the Home button
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
            <div style={styles.buttonWrapper}>{pathname !== '/' && <Button handleClick={handleClick} label="Home" />}</div>
        </section>
    );
};

export default NavBar;
