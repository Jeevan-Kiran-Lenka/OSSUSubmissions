// Solution to 2.8
// Author: Jeevan Kiran Lenka

import { useState } from "react"

const Name = ({ name, number }) => {
  return (
    <div>
      {name} : {number}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: 1, number: "9064612930" },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  const addPerson = (event) => {
    event.preventDefault()
    // console.log("button", event.target)

    const nameObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    }

    setNewName("")
    setNewNumber("")

    const existingPerson = persons.find(
      (p) => p.name === nameObject.name || p.number === nameObject.number
    )

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

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* {console.log(persons)} */}
      {persons.map((person) => (
        <Name key={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  )
}

export default App
