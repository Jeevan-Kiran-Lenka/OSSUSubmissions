import React, { useState } from 'react'
import Button from './Button'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleSetGood = () => {
    setGood(good + 1)
  }

  const handleSetNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleSetBad = () => {
    setBad(bad + 1)
  }

  const handleSetAll = () => {
    setAll(good + neutral + bad)
  }


  return (
    <div>
      <h1>Give Feedback</h1>

      <button onClick={handleSetGood} >good</button>
      <button onClick={handleSetNeutral} >neutral</button>
      <button onClick={handleSetBad} >bad</button>

      <h2>Statistics</h2>

      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>

      {handleSetAll}
      <p>All - {all}</p>
      
      {/* <Button text="Bad" /> */}
    </div>
  )
}

export default App