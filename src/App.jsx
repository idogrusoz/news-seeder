import './App.css';
import NavBar from './components/NavBar/NavBar';
import Routes from './components/Routes/Routes';

function App(props) {
    return (
        <>
            <NavBar />
            <Routes {...props} />;
        </>
    );
}

export default App;
