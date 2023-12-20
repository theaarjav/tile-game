import React, { useEffect, useState } from 'react';
import './Grid.css';

const Grid = () => {
    const initialState = () => {
        const initialTiles = Array.from({ length: 10 }, (_, i) => {
            if (i < 2) return Array.from({ length: 10 }, () => 'green');
            if (i < 4) return Array.from({ length: 10 }, () => 'red');
            return Array.from({ length: 10 }, (_, j) => ((i === 4 && j === 7) || (i === 5 && (j === 2 || j === 8)) || (i === 6 && (j === 1 || j === 3 || j === 4 || j === 6)) || (i === 7 && (j === 0 || j === 5 || j === 9)) || (i === 8 && j === 8) || (i === 9 && j === 2) ? 'blue' : 'empty'));
        });

        return initialTiles;
    };
    const [tiles, setTiles] = useState(initialState());
    const [swapDirection, setSwapDirection] = useState(1); 
    const [score, setScore] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [start, setStart] = useState(false)
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTiles(
                (prevTiles) => {
                return swapRows(prevTiles);
            });

        }, (6 - speed) * 50);

        return () => clearInterval(intervalId);
    }, [swapDirection]);


    const swapRows = (prevTiles) => {
        var newTiles = [...prevTiles];
        if (swapDirection === 1) {

            let firstRedRow = newTiles[2];
            let nextBlueRow = newTiles[4];
            let fRed = 2, nBlue = 4;
            for (let i = 0; i < 10; i++) {
                if (newTiles[i][0] === 'red') {
                    firstRedRow = newTiles[i];
                    fRed = i;
                    if (i < 8) {
                        nextBlueRow = newTiles[i + 2];
                        nBlue = i + 2;
                    }
                    break;
                }
            }
            if (fRed >= 7)
                setSwapDirection(-1);
            newTiles[fRed] = nextBlueRow;
            newTiles[nBlue] = firstRedRow;
        } else {

            let lastRedRow = newTiles[9];
            let lastBlueRow = newTiles[7];
            let lRed = 9, lBlue = 7;
            for (let i = 9; i >= 0; i--) {
                if (newTiles[i][0] === 'red') {
                    lastRedRow = newTiles[i];
                    lRed = i;
                    if (i > 3) {
                        lastBlueRow = newTiles[i - 2];
                        lBlue = i - 2;
                    }
                    break;
                }
            }

            newTiles[lRed] = lastBlueRow;
            newTiles[lBlue] = lastRedRow;
            if (lRed <= 4)
                setSwapDirection(1);
        }
        return newTiles;
    };

    const clickHandler = (e) => {
        if(!start)return;
        var color = e.target.className.split(" ")[1];
        if (e.target.className.includes("blue")) setScore(score + 10);
        else if (e.target.className.includes("red")) setScore(score - 10);
        
        e.target.className = e.target.className.slice(0, 4);
        
        setTimeout(() => {
            e.target.className = e.target.className.concat(" " + color);
        }, 40);
        setTimeout(() => {
            e.target.className = e.target.className.slice(0, 4);
        }, 80);
        setTimeout(() => {
            e.target.className = e.target.className.concat(' ' + color);
        }, 120);
        setTimeout(() => {
            e.target.className = e.target.className.slice(0, 4);
        }, 160);
        setTimeout(() => {
            e.target.className = e.target.className.concat(' ' + color);
        }, 200);
        console.log(e.target.className)
        console.log(score)
    }

    return (
        <div className='game'>
            <div className='animation-container'>
                <div className='score-speed-controller'>
                    <div>Speed Level</div>
                    <div>

                        <button className='button increase' onClick={() => speed < 5 ? setSpeed(speed + 1) : ""} disabled={(!start || speed >= 5) ? true : false}>^</button>
                        <div className='speed-number'>{speed}</div>
                        <button className='button decrease' onClick={() => speed > 1 ? setSpeed(speed - 1) : ""} disabled={(!start || speed <= 1) ? true : false}>^</button>
                    </div>
                    <div className='scoreboard'>
                        Score: {score}
                    </div>
                </div>
                <div className="Grid">
                    {tiles.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map((tile, colIndex) => (
                                <div
                                    key={colIndex}
                                    className={`tile ${tile}`}
                                    onClick={clickHandler}
                                ></div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className='start-stop'>
                <button className='button start' disabled={start?true:false} onClick={()=>{
                    setTiles(initialState());
                    setScore(0);
                    setStart(true);
                }}>
                    Start
                </button>
                <button className='button stop' disabled={start?false:true} onClick={()=>setStart(false)}>
                    Stop
                </button>
            </div>
        </div>
    );
};

export default Grid;
