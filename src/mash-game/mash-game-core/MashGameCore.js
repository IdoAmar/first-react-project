import './MashGameCore.css'
import React, { useState, useEffect, useRef } from 'react';
import { gameSettings, boardSizes } from '../GameSettings';

const buttonText = `\u00A0 _\u00A0\u00A0 \u00A0 _\n\n/ \\\\..//\\\n\n\u00A0  ( oo)\n\n\u00A0\u00A0\u00A0\u00A0\u00A0 ° \n`
const clickedButtonText = `\u00A0\u00A0 ..\u00A0\u00A0\u00A0\u00A0..\n\n\u00A0\u00A0 \\\\..//\n\n\u00A0  (┬ ┬)\n\n\u00A0\u00A0\u00A0\u00A0 ^ \n\n`

function MashGameCore(props) {
    const difficulty = gameSettings[props.difficulty];
    const boardSize = boardSizes[props.boardSize];
    const excludeList = useRef([]);
    const [gameState, setGameState] = useState({
        score: 0,
        lives: difficulty.lives,
        activateIndex: null,
    })

    const resetGame = () => {
        setGameState({
        score: 0,
        lives : difficulty.lives,
        activateIndex : null
    });
    excludeList.current = [];
}

    useEffect(() => {
        const interval = setInterval(() => {
            let actualList = [...Array(Math.pow(boardSize, 2)).keys()].filter(e => !excludeList.current.includes(e));
            let randomNumber = Math.floor(Math.random() * actualList.length);
            setGameState(c => ({ ...c, activateIndex: actualList[randomNumber] }));
        }, difficulty.emergeInterval)
        return () => clearInterval(interval);
    }, [])

    const boardRows = ([...new Array(boardSize)]).map((e, i) =>
         (<div key={'CubeRow_' + i} className="CubeRow">
            {([...new Array(boardSize)]).map((e, j) =>
                <Cube 
                    key={'CubeRow_' + i * boardSize + j}
                    index={i * boardSize + j}
                    excludeList={excludeList}
                    setGameState={setGameState}
                    gameState={gameState}
                    vanishInterval={difficulty.vanishInterval}
                >
                </Cube>)}
        </div>));

    return (
        <div className="MainContent">

            {gameState.lives > 0 ?
                (<div>
                    <div> Score is : {gameState.score}</div>
                    <div> Lives left : {[...Array(gameState.lives)].reduce((p , c ) => p +"❤️","")}</div>
                    <div className="Board">
                        {boardRows}
                    </div>
                </div>)
                :
                <DisplayScoreAndRetry score={gameState.score} resetGame={resetGame} backToMenu={ () => {props.backToMenu(); resetGame()}}></DisplayScoreAndRetry>
            }
        </div>
    );
}

function DisplayScoreAndRetry(props) {
    return (
        <div className='ButtonsContainer'>
            <div style={{alignSelf : "center"}}> Your score was : {props.score}</div>
            <button className='MenuButton' onClick={props.resetGame}> Retry ? </button>
            <button className='MenuButton' onClick={props.backToMenu}> Back to main menu</button>
        </div>)
}

function Cube(props) {
    const [text, setText] = useState('');
    const [internalIsActive, setInternalIsActive] = useState(false);
    const isActive = props.gameState.activateIndex === props.index;
    const properties = { ...props }
    let timeoutRef = useRef(null);

    useEffect((() => () => clearTimeout(timeoutRef.current)), [])

    useEffect(() => {
        if (isActive) {
            setText(buttonText);
            setInternalIsActive(true);
            props.excludeList.current.push(props.index);
            timeoutRef.current = setTimeout(() => {
                setInternalIsActive(false);
                props.setGameState(c => ({ ...c, lives: c.lives - 1 }))
                setText('');
                props.excludeList.current = [...(props.excludeList.current.filter(e => !(e === props.index)))];
            }, props.vanishInterval);
        }
    }, [properties.gameState.activateIndex]);
    return (
        <div
            className={internalIsActive ? 'CubeMashable Cube' : 'Cube'}
            onClick={() => {
                if (internalIsActive) {
                    clearTimeout(timeoutRef.current);
                    setText('');
                    setInternalIsActive(false);
                    props.setGameState(c => ({ ...c, activateIndex: null }))
                    props.excludeList.current = [...(props.excludeList.current.filter(e => !(e === props.index)))];
                    props.setGameState(c => ({ ...c, score: c.score + 1 }));
                }
                else {
                    props.setGameState(c => ({ ...c, lives: c.lives - 1 }))
                }
            }}
            onMouseDown={() => { setText(internalIsActive ? clickedButtonText : '') }}
            onMouseUp={() => { setText(internalIsActive ? buttonText : '') }}
            onMouseOut={() => { setText(internalIsActive ? buttonText : '') }}>
            {text}
        </div>);
}
export default MashGameCore;