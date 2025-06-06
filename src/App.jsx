import { useState, useEffect, useRef } from 'react'
import Die from "./components/Die.jsx";
import { nanoid } from 'nanoid'
import Confetti from "react-confetti";

import './App.css'

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const buttonRef = useRef(null);
  //game won condition
  const gameWon = (dice.every(die => die.isHeld && die.value === dice[0].value)) 

  useEffect(
    () => {
      buttonRef.current.focus()
    }, [gameWon]
  )
 
  function generateAllNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++){
      const random = Math.floor((Math.random() * 6) + 1);
      newDice.push({
        value: random,
        id: nanoid(),
        isHeld: false,
       });
    }
    return newDice;
  }

  const dieElements = dice.map((die) => <Die
    key={die.id}
    value={die.value}
    isHeld={die.isHeld}
    holdDice={() => holdDice(die.id)}
  />)

  function rollDice() {
    if (!gameWon) {
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld
            ? die
            : { ...die, value: Math.floor(Math.random() * 6 + 1) }
        )
      )
    }
    else {
      setDice(generateAllNewDice());
    }

  }

  // function holdDice(id) {
  //   setDice(oldDice =>
  //     oldDice.map(die => die.id === id ? { ...die, isHeld: !die.isHeld } : die))
  // }

  function holdDice(id) {
    setDice((oldDice) => {
      const clickedDie = oldDice.find((die) => die.id === id);

      // If the clicked die is already held, un-hold all dice with the same value
      if (clickedDie.isHeld) {
        return oldDice.map((die) =>
          die.value === clickedDie.value ? { ...die, isHeld: false } : die
        );
      }

      // Otherwise, just toggle the clicked die
      return oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      );
    });
  }

  return (
    <main>
      {gameWon && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      
      <div className="dice-container">
        {dieElements}      
      </div>
      <button ref={buttonRef} className="roll-button" onClick={rollDice}>{ gameWon ? "New Game" : "Roll"}</button>
      
    </main>
  );
}

export default App
