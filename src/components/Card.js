import React,{useState,useEffect} from 'react'
import styled from 'styled-components';


const Card = ({
    image,des,id,setTestCards,
    validCards,testCards,setInProcess,
    inProcess,clearBoard,setValidCards,handleShuffleArr,
    timeLeft
    }) => {
    const [openCard,setOpenCard] = useState(false);
    const [shakeCard,setShakeCard] = useState(false);

    const handleOpenCard = ()=>{
        if(openCard || inProcess || clearBoard || timeLeft === 0) return;
        setOpenCard(true);
        setTestCards([...testCards,id]);
    }

    useEffect(() => {
        if(validCards.includes(id)){
            setOpenCard(true);
        }
    }, [validCards]);

    useEffect(() => {
        if(clearBoard) return;
        if(testCards.length ===0 && !validCards.includes(id)){
            if(openCard){
                setShakeCard(true);
            }
            setTimeout(() => {
                setOpenCard(false);
                setShakeCard(false);
                setInProcess(false);
            },500)
        }
    }, [testCards]);

    useEffect(() => {
        if(clearBoard){
            setOpenCard(false);
            setTimeout(() => {
                handleShuffleArr();
            },0);
        }
    }, [clearBoard]);

  return (
    <Wrapper onClick={handleOpenCard}>
        <div className={`flip-card-wrapper ${shakeCard && 'shake'}`}>
            <div className={`flip-card-inner ${openCard && 'open'} ${shakeCard && 'shake'}`}>
                <img className="card-back" src={image} alt={des}/>
                <img className="card-front" src='https://res.cloudinary.com/dhrpdnd8m/image/upload/v1660875249/tptf46hvdk6iuvmkspmt.png' alt={des}/>
            </div>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    height:100px;
    background-color: transparent;
    width:100px;
    border-radius:0.5rem;
    cursor:pointer;

    .flip-card-wrapper{
        width:100%;
        height:100%;
        position:relative;
        .flip-card-inner{
            position: relative;
            width: 100%;
            height: 100%;
            border-radius:0.5rem;
            text-align: center;
            transition: transform 0.8s;
            transform-style: preserve-3d;
            box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.3);
            .card-front{
                object-fit:cover;
                border-radius:0.5rem;
                position: absolute;
                width: 100%;
                height: 100%;
                top:0;
                left:0;
                -webkit-backface-visibility: hidden; /* Safari */
                backface-visibility: hidden;
            }
            .card-back{
                object-fit:cover;
                position: absolute;
                transform: rotateY(180deg);
                border-radius:0.5rem;
                width: 100%;
                height: 100%;
                top:0;
                left:0;
                -webkit-backface-visibility: hidden; /* Safari */
                backface-visibility: hidden;
            }
        }

        .flip-card-inner.open{
            transform: rotateY(180deg);
            box-shadow: -2px 3px 3px rgba(0, 0, 0, 0.3);
        }
    }
    .flip-card-wrapper.shake{
        animation: shake 0.5s;
    }

    @keyframes shake {
        10%, 90% {
            transform: translate3d(-1px, 0, 0);
        }
        
        20%, 80% {
            transform: translate3d(1px, 0, 0);
        }

        30%, 50%, 70% {
            transform: translate3d(-3px, 0, 0);
        }

        40%, 60% {
            transform: translate3d(3px, 0, 0);
        }
    }
`

export default Card