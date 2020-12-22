import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Routes from './components/Routes/Routes';

function App(props) {
    const [selected, setSelected] = useState(null);
    return (
        <>
            <NavBar setSelected={setSelected} />
            <Routes {...props} selected={selected} setSelected={setSelected} />
        </>
    );
}

export default App;
