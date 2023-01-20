import { useState, useEffect } from "react";
import axios from "axios";

import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);

  // Could be combined into one state object
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredName, setFilterName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  // better to use generic setter function like this or define seperate handlers?
  const handleChange = (setFunction) => (event) =>
    setFunction(event.target.value);

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    persons.find((person) => person.name === newName)
      ? window.alert(`${newName} is already added to the phonebook`)
      : setPersons(
          persons.concat({
            name: newName,
            number: newNumber,
            id: persons.length + 1,
          })
        );
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
      {filteredName ? (
        <Persons
          persons={persons.filter((person) =>
            person.name.toUpperCase().includes(filteredName.toUpperCase())
          )}
        />
      ) : (
        <Persons persons={persons} />
      )}
    </div>
  );
};

export default App;
