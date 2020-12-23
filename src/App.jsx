import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import Routes from './components/Routes/Routes';

function App(props) {
    // State of the selected article through search or headlines
    const [selected, setSelected] = useState(null);
    return (
        <>
            <NavBar setSelected={setSelected} />
            <Routes {...props} selected={selected} setSelected={setSelected} />
        </>
    );
}

export default App;
