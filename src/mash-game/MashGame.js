import './MashGame.css'
import React , {useState, useEffect, useRef} from 'react';
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
    const [score, setScore] = useState(0);
    const incrementScore = () => setScore(score + 1);
    const [activateIndex, setActivateIndex] = useState();
    const changeIndex = (shouldClear) => {
                    if(shouldClear){
                        setActivateIndex(null);
                        return;
                    }
                    let actualList = [...Array(rows * cols).keys()].filter(e => !excludeList.current.includes(e));
                    let randomNumber = Math.floor(Math.random() * actualList.length);
                    setActivateIndex(actualList[randomNumber]);
    }
    useEffect(() => {
        const interval = setInterval(()=>{
            changeIndex();
        },300)
        return () => clearInterval(interval);
    }, [])
    const boardRows = ([...new Array(rows)]).map((e , i)=> 
        <CubesRow 
        key={i}
        activateIndex={activateIndex} 
        rowIndex={i}
        incrementScore={incrementScore}
        changeIndex={changeIndex}
        excludeList={excludeList}
        >
        </CubesRow>);

    return (
        <div className="MainContent">
            <div> Score is : {score}</div>
            <div className="Board">
                {boardRows}
            </div>
        </div>
    );
}

function CubesRow(props) {
    return (
        <div className="CubeRow">
            {([...new Array(cols)]).map((e,i) => 
            <Cube key={props.rowIndex * cols + i}
            activateIndex={props.activateIndex}
            index={props.rowIndex * cols + i} 
            incrementScore={props.incrementScore} 
            changeIndex={props.changeIndex}
            excludeList={props.excludeList}
            >
            </Cube>)}
        </div>
    );
}

function Cube(props) {
    const [text, setText] = useState('');
    const [internalIsActive , setInternalIsActive] = useState(false);
    const isActive = props.activateIndex === props.index;

    let timeoutRef = useRef(null);
    useEffect(() => {
        if(isActive){
            setText(buttonText);
            setInternalIsActive(true);
            props.excludeList.current.push(props.index);
            timeoutRef.current = setTimeout(() => {
                setInternalIsActive(false);
                setText('');
                props.excludeList.current = [...(props.excludeList.current.filter(e => !(e === props.index)))];
            }, 900);
        }
    })
    return (
        <div 
        className={internalIsActive ? 'CubeMashable Cube' : 'Cube'}
        onClick={() => { 
            if(internalIsActive){
                clearTimeout(timeoutRef.current);
                setText('');
                setInternalIsActive(false);
                props.changeIndex(true);
                props.excludeList.current = [...(props.excludeList.current.filter(e => !(e === props.index)))];
                props.incrementScore();
            }
            }} 
        onMouseDown={() => {setText(internalIsActive ? clickedButtonText : '')}}
        onMouseUp={() => {setText(internalIsActive ? buttonText : '')}}
        onMouseOut={() => {setText(internalIsActive ? buttonText : '')}}>
            {text}
        </div>);
}
export default MashGame;