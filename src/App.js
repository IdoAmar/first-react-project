import './App.css';
import Header from './common/header/Header'
import MashGameMenu from './mash-game/mash-game-menu/MashGameMenu'

function App() {
    return (
        <div className="App">
            <Header text="Mash Game"></Header>
            <div className="MainContent">
                <MashGameMenu></MashGameMenu>
            </div>
        </div>
    );
}

export default App;
