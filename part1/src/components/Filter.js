const Filter = ({ value, handleChange }) => {
  return (
    <div>
      Filter shown with
      <input value={value} onChange={handleChange} />
    </div>
  )
}

export default Filter
