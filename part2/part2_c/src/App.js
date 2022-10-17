// Solution to 2.10
// Author: Jeevan Kiran Lenka

import axios from "axios"
import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    console.log("effect")
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled")
      console.log(response.data)
      setPersons(response.data)
    })
  }, [])

  console.log("render", persons.length, "persons")

  const addPerson = (event) => {
    event.preventDefault()
    // console.log("button", event.target)

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
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
        handleNameChange={({ target }) => setNewName(target.value)}
        handleNumberChange={({ target }) => setNewNumber(target.value)}
        addPerson={addPerson}
      />
      <Persons persons={personsToshow} />
    </div>
  )
}

export default App
