import React from 'react';
import Content from './Content';
import Header from './Header';
import Total from './Total';

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const excercises1 = 10
  const part2 = 'Using props to pass data'
  const excercises2 = 7
  const part3 = 'State of a component'
  const excercises3 = 14

  return (
    <div>
      <Header course = {course}/>
      <Content part1= {part1} part2= {part2} part3= {part3} excercises1={excercises1} excercises2={excercises2} excercises3={excercises3}/>
      <Total excercises1={excercises1} excercises2={excercises2} excercises3={excercises3}/>
    </div>
  )
}

export default App;
