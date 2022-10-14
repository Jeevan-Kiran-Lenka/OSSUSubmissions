// Solution to 2.9
// Author: Jeevan Kiran Lenka

import { useState } from "react"

const Name = ({ name, number }) => {
  return (
    <div>
      {name} : {number}
    </div>
  )
}

const Filter = ({ value, handleChange }) => {
  return (
    <div>
      Filter shown with
      <input value={value} onChange={handleChange} />
    </div>
  )
}

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <div>
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
    </div>
  )
}

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

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
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

  const personsToshow =
    filter.length === 0
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={filter}
        handleChange={({ target }) => setFilter(target.value)}
      />
      <PersonForm
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <Persons persons={personsToshow} />
    </div>
  )
}

export default App
