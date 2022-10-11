// Solution for 1.9
// Author: Jeevan-Kiran-Lenka

import { useState } from "react"

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral

  const showAverage = () => {
    if (all === 0) {
      return 0
    }
    return (good * 1 + bad * -1) / all
  }

  const showPositive = () => {
    if (all === 0) {
      return 0
    }
    return (good / all) * 100
  }

  return (
    <div>
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {showAverage()}</p>
      <p>positive {showPositive()}%</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  const all = () => {
    return good + bad + neutral
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>

      {all > 0 ? (
        <Statistics good={good} bad={bad} neutral={neutral} />
      ) : (
        <p>No feedback given</p>
      )}

      {/* <Statistics good={good} bad={bad} neutral={neutral} /> */}
    </div>
  )
}

export default App
