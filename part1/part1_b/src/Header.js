function Header(course) {
  console.log(course)
  console.log("Name:", course.course.name)
  console.log(course.course)
  return (
    <div>
      <h1>{course.course.name}</h1>
    </div>
  )
}

export default Header
