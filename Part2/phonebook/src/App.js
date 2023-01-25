import { useState, useEffect } from "react";

import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import personService from "./services/persons";

import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);

  // Could be combined into one state object
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredName, setFilterName] = useState("");
  const [notification, setNotification] = useState({ color: "", message: "" });

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
      createNewPerson({
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      });
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

  const createNewPerson = (person) => {
    personService.create(person).then((addedPerson) => {
      setPersons(persons.concat(addedPerson));
      setNotification({ color: "green", message: `Added ${newName}` });
      setTimeout(() => setNotification(""), 5000);
    });
  };

  const updatePhoneNumber = (person, number) => {
    const updatedPerson = { ...person, number };
    const updatedPersons = persons.map((p) =>
      p.id === updatedPerson.id ? updatedPerson : p
    );
    personService
      .update(updatedPerson.id, updatedPerson)
      .then(() => {
        setPersons(updatedPersons);
        setNotification({
          color: "green",
          message: `Updated ${updatedPerson.name} with ${updatedPerson.number}`,
        });
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setNotification({
          color: "red",
          message: `Information of ${updatedPerson.name} has already been removed from the server`,
        });
      });
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
      <Notification message={notification.message} color={notification.color} />
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
