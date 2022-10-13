// Solution 2.1,2.2,2.3
// Author - Jeevan Kiran Lenka

const Total = ({ parts }) => {
  // const total = parts.reduce((s, p) => {
  //   console.log("What is happening", "s:", s, "p:", p.exercises)
  //   return s + p.exercises
  // }, 0)

  const total = parts.reduce((a, b) => a + b.exercises, 0)

  return (
    <div>
      <p>
        <b>total of {total} exercises</b>
      </p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  }

  return <Course course={course} />
}

export default App
