import { useState, useEffect } from 'react'
import './index.css'

import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [actionMessage, setActionMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => { 
    event.preventDefault()
    
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const duplicate = persons.find(person => person.name === newName)
    if (duplicate) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...duplicate, number: newNumber }
        personService
          .update(duplicate.id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
              setNewName('')
              setNewNumber('')
              setActionMessage(`Updated ${newName}'s number`)
              setTimeout(() => {
                setActionMessage(null)
              }, 3000)
            })
            .catch(error => {
              setNewName('')
              setNewNumber('')
              setErrorMessage(`Oops, ${duplicate.name} has already been removed from the server.`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              setPersons(persons.filter(person => person.id !== duplicate.id))
            })
      }
    } else {
      personService
      .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setActionMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setActionMessage(null)
          }, 3000)
        })
    }
  }

  const deletePerson = (id) => {
    const deletePerson = persons.find(person => person.id === id)
    if (window.confirm(`Do you want to delete ${deletePerson.name}?`)) {
      personService
      .deletePerson(id)
        .then((deletePerson) => {
          setPersons(persons.filter(person => person.id !== deletePerson.id))
        })
      setActionMessage(`Deleted ${deletePerson.name}`)
      setTimeout(() => {
        setActionMessage(null)
      }, 3000)
    } 
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={actionMessage} type='action'/>
      <Notification message={errorMessage} type='error'/>

      <Filter val={filterString} changeFunc={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />
      
      <h3>Numbers</h3>
      <Persons 
        persons={persons} 
        filterString={filterString} 
        deletePerson={deletePerson}
      />
    </>
  )
}

export default App