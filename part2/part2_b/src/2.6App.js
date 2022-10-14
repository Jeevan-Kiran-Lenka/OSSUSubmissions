// Solution to 2.6
// Author: Jeevan Kiran Lenka

import { useState } from "react"

const Name = ({ name }) => {
  return <div>{name}</div>
}

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }])
  const [newName, setNewName] = useState("")
  const [showUnique, setShowUnique] = useState(true)

  const addPerson = (event) => {
    event.preventDefault()
    // console.log("button", event.target)

    const nameObject = {
      name: newName,
      id: persons.name,
      unique: true,
    }

    setPersons(persons.concat(nameObject))
    setNewName("")
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const alert = showUnique
    ? persons
    : persons.filter((person) => person.unique === true)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* {console.log(persons)} */}
      {persons.map((person) => (
        <Name key={person.name} name={person.name} />
      ))}
    </div>
  )
}

export default App
