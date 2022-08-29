import React,{useState,useEffect} from 'react'
import styled from 'styled-components';

import {easyLevel} from '../data/easyLevel'
import {normalLevel} from '../data/normalLevel'
import {hardLevel} from '../data/hardLevel'
import Card from './Card'

const Board = () => {
    const [level,setLevel] = useState(2);
    const [cards,setCards] = useState([]);
    const [testCards,setTestCards] = useState([]);

    const [validCards,setValidCards] = useState([]);
    const [inProcess,setInProcess] = useState(false);

    const [clearBoard,setClearBoard] = useState(false);
    const [gameStart,setGameStart] = useState(false);

    const [duration,setDuration] = useState(120);
    const [timeLeft,setTimeLeft] = useState(duration);

    useEffect(() => {
        if(testCards.length === 2){
            setInProcess(true);
            if(testCards[0] === testCards[1]){
                setValidCards([...validCards,testCards[0]])
                setTestCards([]);
            }else{
                setTimeout(()=>{
                    setTestCards([]);
                },1000)
            }
        }
    }, [testCards]);

    useEffect(() => {
        handleShuffleArr();
    }, [level]);

    const handleShuffleArr = ()=>{
        const suitableArr = level === 1 ? easyLevel : level === 2 ? normalLevel : hardLevel;
        const shuffledArr = suitableArr.map(i =>{
            i.order = Math.floor(Math.random() * 100);
            return i;
        })
        shuffledArr.sort((a,b)=> a.order - b.order);

        setTestCards([]);
        setInProcess(false);
        setValidCards([]);
        setClearBoard(false);

        setTimeout(()=>{
            setCards(shuffledArr);
        },500);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if(!gameStart || timeLeft <= 0) return;
            setTimeLeft(timeLeft - 0.25);
        }, 250);
        return () => clearTimeout(timer);
    }, [timeLeft,gameStart]);

  return (
    <Wrapper>
        {
            validCards.length === cards.length/2 && gameStart
            ?
            <span className="success-title">{level === 1 ? 'Awww, let me give you a candy!' : level === 2 ? 'Horray! You have finished the game' :'Excellent! You are rock!'}</span>
            :
            timeLeft === 0 && validCards.length < cards.length/2 && gameStart
            &&
            <span className="success-title fail">{level === 1 ? "Awww, do not cry my sweet heart" : level === 2 ? "You can't beat this game ??" : "Let's try again. Don't worry about it"}</span>
        }

        {
            !gameStart &&
            <div className="difficulty-selections">
                <div className={`difficulty-item ${level === 1 && 'active'}`} onClick={()=>{
                    setLevel(1);
                    setDuration(120);
                    setTimeLeft(120);
                }}>
                    <img src="https://res.cloudinary.com/dhrpdnd8m/image/upload/v1661744126/bczsc1eo31te8xzt8szb.png"/>
                    <span>Mama, Can I play?</span>
                </div>
                <div className={`difficulty-item ${level === 2 && 'active'}`} onClick={()=>{
                    setLevel(2);
                    setDuration(90);
                    setTimeLeft(90);
                }}>
                    <img src="https://res.cloudinary.com/dhrpdnd8m/image/upload/v1661744021/qxg1dx6z7b1qh7osybqg.png"/>
                    <span>Let's relax</span>
                </div>
                <div className={`difficulty-item ${level === 3 && 'active'}`} onClick={()=>{
                    setLevel(3);
                    setDuration(60);
                    setTimeLeft(60);
                }}>
                    <img src="https://res.cloudinary.com/dhrpdnd8m/image/upload/v1661744018/b8aenld3er8ubowzhtfm.png"/>
                    <span>Time to slay</span>
                </div>
            </div>
        }

        {   
            (validCards.length === cards.length/2 || timeLeft === 0) && gameStart
            ?
            <div className="btn-group">
                <div className="restart-btn" onClick={()=>{
                    if(clearBoard) return;
                    setTimeLeft(duration);
                    setClearBoard(true);
                }}>
                    <span>Restart</span>
                </div>
                <div className="restart-btn" onClick={()=>{
                    if(clearBoard) return;
                    setGameStart(false);
                }}>
                    <span>Return</span>
                </div>
            </div>
            :
            !gameStart
            ?
            <div className="restart-btn" onClick={()=>{
                setGameStart(true);
                setValidCards([]);
                setTestCards([]);
                setInProcess(false);
                setClearBoard(false);
                setTimeLeft(duration);
            }}>
                <span>Start game</span>
            </div>
            :
            <div className = "progress-bar-wrapper">
                <div className="progress-bar" style={{width:`${timeLeft/duration*100}%`}}></div>
            </div>
        }

        {validCards.length !== cards.length/2 && timeLeft !== 0 && gameStart && <div className="restart-btn" onClick={()=>{
            if(clearBoard) return;
            setGameStart(false);
        }}>
            <span>Return</span>
        </div>}
        
        {gameStart && <div className={`board ${level === 2 ? 'normal' : level === 3? 'hard':''}`} >
            {
                cards.map((i,index) => <Card {...i} 
                key={index} setTestCards={setTestCards} 
                testCards={testCards}
                timeLeft={timeLeft}
                setValidCards={setValidCards}
                setInProcess={setInProcess}
                inProcess={inProcess}
                clearBoard={clearBoard}
                handleShuffleArr={handleShuffleArr}
                validCards={validCards}/> )
            }
        </div>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:1rem; 

    .success-title{
        color:green;
        font-weight:500;
        font-size:1.5rem;
        text-align:center;
        @media (max-width:769px){
            font-size:1.2rem;
        }
        @media (max-width:426px){
            font-size:1rem;
        }
    }
    .success-title.fail{
        color:red;
    }

    .board{
        display:grid;
        width:auto;
        grid-template-columns:repeat(4,1fr);
        height:auto;
        gap:0.5rem;
    }
    .board.normal{
        grid-template-columns:repeat(5,1fr);
    }

    .board.hard{
        grid-template-columns:repeat(6,1fr);
    }

    .progress-bar-wrapper{
        height:30px;
        width:80%;
        background:lightgrey;
        border:4px solid grey;
        border-radius:2rem;
        overflow:hidden;
        @media (max-width:426px){
            height:20px;
        }
        .progress-bar{
            height:100%;
            background-image: linear-gradient(to right, #2B7A0B, #5BB318,#7DCE13);
        }
    }

    .difficulty-selections{
        display:flex;
        align-items:center;
        justify-content:space-around;
        gap:1rem;

        @media (max-width:426px){
            flex-direction:column;
            gap:0.5rem;
        }
        .difficulty-item{
            cursor:pointer;
            padding:0.5rem;
            background:white;
            transition:all 0.3s linear;
            display:flex;
            align-items:center;
            justify-content:center;
            border-radius:1rem;
            border:4px solid grey;
            gap:0.5rem;
            :hover{
                background:#f1f1f1;
            }
            img{
                width:40px;
                height:40px;
                object-fit:cover;
            }
            span{
                font-size:1rem;
                font-weight:500;
            }
        }
        .difficulty-item.active{
            border:4px solid crimson;
            span{
                color:crimson;
            }
        }
    }

    .btn-group{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:1rem;
        .restart-btn{
            background:#000000;
            transition: all linear 0.4s;
            padding:0.5rem 1rem;
            border-radius:0.5rem;
            cursor:pointer;
            display:flex;
            align-items:center;
            justify-content:center;
            :hover{
                background:#716F81;
            }
            span{
                color:white;
                font-weight:500;
                font-size:1rem;
                line-height:1rem;
            }
        }
    }
    .restart-btn{
        background:#000000;
        transition: all linear 0.4s;
        padding:0.5rem 1rem;
        border-radius:0.5rem;
        cursor:pointer;
        display:flex;
        align-items:center;
        justify-content:center;
        :hover{
            background:#716F81;
        }
        span{
            color:white;
            font-weight:500;
            font-size:1rem;
            line-height:1rem;
        }
    }
`

export default Board