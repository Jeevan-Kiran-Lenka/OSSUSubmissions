const Total = ({ parts }) => {
  const total = parts.reduce((a, b) => a + b.exercises, 0)

  return (
    <div>
      <p>
        <b>total of {total} exercises</b>
      </p>
    </div>
  )
}

const Course = ({ name, parts }) => {
  return (
    <div>
      <h1>{name}</h1>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <Total parts={parts} />
    </div>
  )
}

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} name={course.name} parts={course.parts} />
      ))}
    </div>
  )
}

export default Courses
