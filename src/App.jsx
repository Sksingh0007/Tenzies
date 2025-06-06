import { useState } from 'react'
import Die from "./components/Die.jsx";
import {nanoid} from 'nanoid'

import './App.css'

function App() {
  const [dice, setDice] = useState(generateAllNewDice());
  function generateAllNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++){
      const random = Math.floor((Math.random() * 6) + 1);
      newDice.push({
        value: random,
        id: nanoid(),
       });
    }
    return newDice;
  }

  const dieElements = dice.map((die) => <Die key={die.id} value={die.value} />)

  function rollDice() {
    setDice(generateAllNewDice());
  }


  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      
      <div className="dice-container">
        {dieElements}      
      </div>
      <button className="roll-button" onClick={rollDice}>Roll</button>
      
    </main>
  );
}

export default App
