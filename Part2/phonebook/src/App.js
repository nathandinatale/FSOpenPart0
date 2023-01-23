import { useState, useEffect } from "react";

import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  // Could be combined into one state object
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredName, setFilterName] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  // better to use generic setter function like this or define seperate handlers?
  const handleChange = (setFunction) => (event) =>
    setFunction(event.target.value);

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    const storedPerson = persons.find((person) => person.name === newName);

    if (!storedPerson) {
      personService
        .create({
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        })
        .then((addedPerson) => setPersons(persons.concat(addedPerson)));
      return;
    }

    if (storedPerson.number === newNumber) {
      window.alert(`${newName} with phone number ${newNumber} already exists!`);
      return;
    }

    window.confirm(
      `${newName} is already added to the phonebook, replace the old number with a new one?`
    ) && updatePhoneNumber(storedPerson, newNumber);
  };

  const updatePhoneNumber = (person, number) => {
    const updatedPerson = { ...person, number };
    const updatedPersons = persons.map((p) =>
      p.id === updatedPerson.id ? updatedPerson : p
    );
    personService.update(person.id, person).then(setPersons(updatedPersons));
    setNewName("");
    setNewNumber("");
  };

  const handlePersonDelete = (person) => {
    window.confirm(`Delete ${person.name}?`) &&
      personService
        .remove(person.id)
        .then(setPersons(persons.filter((p) => p.id !== person.id)));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filteredName} handleUpdate={handleChange(setFilterName)} />
      <h3>add a new</h3>
      <PersonForm
        name={newName}
        handleNameChange={handleChange(setNewName)}
        number={newNumber}
        handleNumberChange={handleChange(setNewNumber)}
        handlePersonSubmit={handlePersonSubmit}
      />
      <h3>Numbers</h3>
      <Persons
        persons={
          filteredName
            ? persons.filter((person) =>
                person.name.toUpperCase().includes(filteredName.toUpperCase())
              )
            : persons
        }
        handleDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;
