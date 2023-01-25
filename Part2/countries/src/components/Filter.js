const Filter = ({ value, handleUpdate }) => {
  return (
    <div>
      find countries <input value={value} onChange={handleUpdate} />
    </div>
  );
};

export default Filter;
