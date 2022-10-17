import Name from "./Name"

const Persons = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {/* {console.log(persons)} */}
      {persons.map((person) => (
        <Name key={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  )
}

export default Persons
