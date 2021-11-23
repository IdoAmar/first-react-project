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
    const [msg, setMsg] = useState("");
    const buttonClickedOnIndex = ( text ) => setMsg(text);
    const [activateIndex, setActivateIndex] = useState();
    useEffect(() => {
        const interval = setInterval(()=>{
            console.log("list is : ", excludeList.current)
            let actualList = [...Array(rows * cols).keys()].filter(e => !excludeList.current.includes(e));
            console.log("actual list is", actualList);
            let randomNumber = Math.floor(Math.random() * actualList.length);
            console.log("random number is :", actualList[randomNumber])
            setActivateIndex(actualList[randomNumber]);
        },500)
        return () => clearInterval(interval);
    }, [])
    const boardRows = ([...new Array(rows)]).map((e , i)=> 
        <CubesRow 
        key={i}
        activateIndex={activateIndex} 
        rowIndex={i}
        incrementScore={incrementScore}
        buttonClickedOnIndex={buttonClickedOnIndex}
        excludeList={excludeList}
        >
        </CubesRow>);

    return (
        <div className="MainContent">
            <div> Score is : {msg}</div>
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
            buttonClickedOnIndex={props.buttonClickedOnIndex}
            excludeList={props.excludeList}
            >
            </Cube>)}
        </div>
    );
}

function Cube(props) {
    const [text, setText] = useState(buttonText);
    const internalIsActive = useRef(false);
    const isActive = props.activateIndex === props.index


    useEffect(() => {
        if(isActive){
            internalIsActive.current = true;
            props.excludeList.current.push(props.index);
            const t = setTimeout(() => {
                internalIsActive.current = false;
                console.log("activating set Timeout")
                props.excludeList.current = [...(props.excludeList.current.filter(e => !(e === props.index)))];
            }, 2000);
        }
    })
    return (
        <div 
        className={internalIsActive.current ? 'CubeMashable Cube' : 'Cube'}
        onClick={() => {props.incrementScore(); props.buttonClickedOnIndex(props.index)}} 
        onMouseDown={() => {setText(clickedButtonText)}}
        onMouseUp={() => {setText(buttonText)}}
        onMouseOut={() => {setText(buttonText)}}>
            {text}
        </div>);
}
export default MashGame;