import './App.css';
import Header from './core/header/Header'
import MashGame from './mash-game/MashGame'

function App() {
    return (
        <div className="App">
            <Header></Header>
            <div className="MainContent">
                {<MashGame></MashGame>}
            </div>
        </div>
    );
}

export default App;
