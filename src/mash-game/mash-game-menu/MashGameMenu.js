import './MashGameMenu.css'
import React, { useState } from 'react';
import  MashGameCore from '../mash-game-core/MashGameCore'

function MashGameMenu() {
    const [difficulty, setDifficulty] = useState();
    const [boardSize, setBoardSize] = useState();
    const backToMenu = () => {setDifficulty(undefined); setBoardSize(undefined)}
    console.log("arrived at menu", difficulty, boardSize)
    return (difficulty === undefined ? <SelectDifficulty setDifficulty={setDifficulty}></SelectDifficulty> :
        boardSize === undefined ? <SelectBoardSize setBoardSize={setBoardSize}></SelectBoardSize> :
            <MashGameCore difficulty={difficulty} boardSize={boardSize} backToMenu={backToMenu}></MashGameCore>);
}
function SelectDifficulty(props) {
    return <div className='ButtonsContainer'>
        <button className='MenuButton' onClick={() => props.setDifficulty('easy')}>Easy</button>
        <button className='MenuButton' onClick={() => props.setDifficulty('normal')}>Medium</button>
        <button className='MenuButton' onClick={() => props.setDifficulty('hard')}>Hard</button>
    </div>
}

function SelectBoardSize(props) {
    return <div className='ButtonsContainer'>
        <button className='MenuButton' onClick={() => props.setBoardSize('small')}>Small</button>
        <button className='MenuButton' onClick={() => props.setBoardSize('large')}>Large</button>
    </div>
}

export default MashGameMenu;