import './MashGame.css'
import React, { useState, useEffect, useRef } from 'react';
const buttonText =
    `
\u00A0 _\u00A0\u00A0 \u00A0 _\n
/ \\\\..//\\\n
\u00A0  ( oo)\n  
\u00A0\u00A0\u00A0\u00A0\u00A0 ° \n
`
const clickedButtonText =
    `
\u00A0\u00A0 ..\u00A0\u00A0\u00A0\u00A0..\n
\u00A0\u00A0 \\\\..//\n
\u00A0  (┬ ┬)\n 
\u00A0\u00A0\u00A0\u00A0 ^ \n
`
const rows = 3;
const cols = 3;

function MashGame() {
    const excludeList = useRef([]);
    const [gameState , setGameState] = useState({
        score : 0,
        lives: 5,
        activateIndex: null,
    })

    useEffect(() => {
        const interval = setInterval(() => {
            let actualList = [...Array(rows * cols).keys()].filter(e => !excludeList.current.includes(e));
            let randomNumber = Math.floor(Math.random() * actualList.length);
            setGameState(c => ({ ...c, activateIndex : actualList[randomNumber]}));
        }, 300)
        return () => clearInterval(interval);
    }, [])
    
    const boardRows = ([...new Array(rows)]).map((e, i) =>
        <CubesRow
            key={i}
            rowIndex={i}
            excludeList={excludeList}
            setGameState={setGameState}
            gameState={gameState}
        >
        </CubesRow>);

    return (
        <div className="MainContent">

            {gameState.lives > 0 ?
                (<div>
                    <div> Score is : {gameState.score}</div>
                    <div> Lives left : {gameState.lives}</div>
                    <div className="Board">
                        {boardRows}
                    </div>
                </div>)
                :
                (<div> Your score was : {gameState.score}</div>)
            }
        </div>
    );
}

function CubesRow(props) {
    return (
        <div className="CubeRow">
            {([...new Array(cols)]).map((e, i) =>
                <Cube key={props.rowIndex * cols + i}
                    index={props.rowIndex * cols + i}
                    excludeList={props.excludeList}
                    setGameState={props.setGameState}
                    gameState={props.gameState}
                    >
                </Cube>)}
        </div>
    );
}

function Cube(props) {
    const [text, setText] = useState('');
    const [internalIsActive, setInternalIsActive] = useState(false);
    const isActive = props.gameState.activateIndex === props.index;
    const properties = {...props}
    let timeoutRef = useRef(null);

    useEffect((() => () => clearTimeout(timeoutRef.current)),[])

    useEffect(() => {
        if (isActive) {
            setText(buttonText);
            setInternalIsActive(true);
            props.excludeList.current.push(props.index);
            timeoutRef.current = setTimeout(() => {
                setInternalIsActive(false);
                props.setGameState(c => ({ ...c, lives : c.lives - 1 }))
                setText('');
                props.excludeList.current = [...(props.excludeList.current.filter(e => !(e === props.index)))];
            }, 900);
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
                    props.setGameState(c => ({ ...c, activateIndex : null }))
                    props.excludeList.current = [...(props.excludeList.current.filter(e => !(e === props.index)))];
                    props.setGameState(c => ({ ...c, score : c.score + 1 }));
                }
                else {
                    props.setGameState(c => ({ ...c, lives : c.lives - 1 }))
                }
            }}
            onMouseDown={() => { setText(internalIsActive ? clickedButtonText : '') }}
            onMouseUp={() => { setText(internalIsActive ? buttonText : '') }}
            onMouseOut={() => { setText(internalIsActive ? buttonText : '') }}>
            {text}
        </div>);
}
export default MashGame;