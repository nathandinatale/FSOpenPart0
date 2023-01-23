const Persons = ({ persons, handleDelete }) => (
  <>
    {persons.map((person) => (
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person)}>Delete</button>
      </p>
    ))}
  </>
);

export default Persons;
