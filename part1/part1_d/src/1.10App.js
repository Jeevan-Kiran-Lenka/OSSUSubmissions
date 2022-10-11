// Solution for 1.10
// Author: Jeevan-Kiran-Lenka

import { useState } from "react"

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      {text === "positive" ? (
        <p>
          {text} {value}%
        </p>
      ) : (
        <p>
          {text} {value}
        </p>
      )}
    </div>
  )
}

const Statistics = ({ good, bad, neutral, total }) => {
  const showAverage = () => {
    if (total === 0) {
      return 0
    }
    return (good * 1 + bad * -1) / total
  }

  const showPositive = () => {
    if (total === 0) {
      return 0
    }
    return (good / total) * 100
  }

  return (
    <div>
      <h1>Statistics</h1>
      {/* <p>good {good}</p> */}
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="total" value={total} />
      <StatisticLine text="average" value={showAverage()} />
      <StatisticLine text="positive" value={showPositive()} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  const handleGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGood} text="good"></Button>
      <Button onClick={handleNeutral} text="neutral"></Button>
      <Button onClick={handleBad} text="bad"></Button>

      {total > 0 ? (
        <Statistics good={good} bad={bad} neutral={neutral} total={total} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  )
}

export default App
