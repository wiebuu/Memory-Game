import React from 'react';
import './SingleCard.css';
function SingleCard  ({card, handleChoice, flipped, disabled})  {

    const handleClick = () => {
        if(!disabled){
            handleChoice(card)
        }

    }

    return (
    <div className="card">
        <div className= {flipped ? "flipped" : ""}>
        <img className="front" 
        src={card.src} 
        alt="card-front" 
        height={100}/>

        <img className="back" 
        src={require("./Images/first.jpeg")} 
        onClick ={handleClick}
        alt="card-back" 
        height={100}/>
        </div>
    </div>
    );
}

export default SingleCard;
