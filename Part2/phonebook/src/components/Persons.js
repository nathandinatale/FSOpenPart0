const Persons = ({ persons }) => (
  <>
    {persons.map((person) => (
      <p>
        {person.name} {person.number}
      </p>
    ))}
  </>
);

export default Persons;
