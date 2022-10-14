// Solution to 2.7
// Author: Jeevan Kiran Lenka

import { useState } from "react"

const Name = ({ name }) => {
  return <div>{name}</div>
}

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1 }])
  const [newName, setNewName] = useState("")
  // const [filter, setFilter] = useState("")

  const addPerson = (event) => {
    event.preventDefault()
    // console.log("button", event.target)

    const nameObject = {
      name: newName,
      id: persons.length + 1,
    }

    setNewName("")

    const existingPerson = persons.find((p) => p.name === nameObject.name)

    if (existingPerson) {
      window.alert(`${existingPerson.name} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
    }
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

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
        <Name key={person.id} name={person.name} />
      ))}
    </div>
  )
}

export default App
