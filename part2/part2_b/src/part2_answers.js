import axios from "axios"
import { useEffect, useState } from "react"
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

// export default {
//   getAll, create, update, remove
// }

// Person.js

const Persons = ({ persons, handleDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </p>
      ))}
    </>
  )
}

// export default Persons

// Person Form js

const PersonForm = ({
  addPerson,
  name,
  number,
  handleNameChange,
  handleNumberChange,
}) => (
  <>
    <form onSubmit={addPerson}>
      <div>
        name:
        <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        number:
        <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
)

// export default PersonForm

//  Notification.js

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const style = {
    color: notification.type === "alert" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return <div style={style}>{notification.message}</div>
}

// export default Notification

// Filter js

const Filter = ({ value, handleChange }) => {
  return (
    <>
      Filter shown with
      <input value={value} onChange={handleChange} />
    </>
  )
}

// export default Filter

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons)
    })
  }, [])

  const notify = (message, type = "info") => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    setNewName("")
    setNewNumber("")

    const existingPerson = persons.find((p) => p.name === newPerson.name)
    if (existingPerson) {
      const ok = window.confirm(
        `${existingPerson.name} is already added to phonebook, update the number?`
      )
      if (ok) {
        personService
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then((savedPerson) => {
            setPersons(
              persons.map((p) => (p.id === existingPerson.id ? savedPerson : p))
            )
            notify(`Updated info of ${savedPerson.name}`)
          })
          .catch((error) => {
            notify(
              `the person '${existingPerson.name}' was had already been from the server`,
              "alert"
            )
            setPersons(persons.filter((p) => p.id !== existingPerson.id))
          })

        return
      }
    }

    personService.create(newPerson).then((savedPerson) => {
      setPersons(persons.concat(savedPerson))
      notify(`Added ${savedPerson.name}`)
    })
  }

  const deletePerson = (id) => {
    const toDelete = persons.find((p) => p.id === id)
    const ok = window.confirm(`Delete ${toDelete.name}`)
    if (ok) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id))
        notify(`Deleted ${toDelete.name}`)
      })
    }
  }

  const personsToShow =
    filter.length === 0
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
      <Persons persons={personsToShow} handleDelete={deletePerson} />
    </div>
  )
}

export default App
