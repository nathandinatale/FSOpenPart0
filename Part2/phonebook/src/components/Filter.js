const Filter = ({ value, handleUpdate }) => (
  <div>
    filter shown with <input value={value} onChange={handleUpdate} />
  </div>
);

export default Filter;
