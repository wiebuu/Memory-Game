import React, {useState, useEffect} from 'react';
import "./Game.css"
import SingleCard from './SingleCard';

const cardImages = [
    {src:require("./Images/cow.png"), matched: false},
    {src:require("./Images/lion.png"), matched: false},
    {src:require("./Images/koala.png"), matched: false},
    {src:require("./Images/frog.png"), matched: false}
];

function Game () {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random()}))

        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
    }
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    useEffect(() => {
        if(choiceOne && choiceTwo) {
            setDisabled(true)
            
            if(choiceOne.src === choiceTwo.src){
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if(card.src === choiceOne.src) {
                            return {...card, matched: true}
                        } else {
                            return card
                        }
                    })
                })
                resetTurn()
            } else {
                setTimeout(() => resetTurn(), 1000)
            }
        }
    }, [choiceOne, choiceTwo])

    console.log(cards)

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    useEffect(() => {
        shuffleCards()
    },[])

    return (
        <div>
            <h1 className='button'>Magic Match</h1>
            <button className='button' onClick={shuffleCards}>New Game</button>
            <br/>
            <br/>
            <div className="card-grid">
                {cards.map(card => (
                    <SingleCard 
                    key={card.id} 
                    card={card}
                    handleChoice={handleChoice}
                    flipped={card === choiceOne ||card ===  choiceTwo || card.matched}
                    disabled={disabled}
                    />
                ))}
            </div>
            <h6 id="att" className='button'>Attempts:{turns} </h6>
        </div>
    );
}

export default Game;
