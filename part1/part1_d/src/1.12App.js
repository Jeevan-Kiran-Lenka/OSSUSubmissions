// Solution 1.12
// Author: Jeevan-Kiran-Lenka

import { useState } from "react"

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ]

  const points = Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)

  function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const handleClick = () => {
    setSelected(randomNumberInRange(0, anecdotes.length))
  }

  const handleVote = () => {
    points[selected] += 1
  }

  return (
    <div>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <p>
        <button onClick={handleClick}>next anecdotes</button>
        <button onClick={handleVote}>Vote</button>
      </p>
    </div>
  )
}

export default App
