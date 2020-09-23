import React from 'react'
import PropTypes from 'prop-types'

const EditFishForm = (props) => {
  const handleChange = (e) => {
    const { name, value } = e.currentTarget
    const updatedFish = {
      ...props.fish,
      [name]: name === 'price' ? parseFloat(value) : value,
    }
    props.editFish(updatedFish, props.index)
  }

  const { name, price, desc, status, image } = props.fish
  return (
    <form className="fish-edit">
      <input onChange={handleChange} type="text" name="name" value={name} />
      <input
        onChange={handleChange}
        type="number"
        name="price"
        placeholder="Price"
        value={price}
      />
      <select onChange={handleChange} name="status" value={status}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out</option>
      </select>
      <textarea
        onChange={handleChange}
        name="desc"
        cols="30"
        rows="10"
        value={desc}
      ></textarea>
      <input onChange={handleChange} type="text" name="image" value={image} />
      <button type="button" onClick={() => props.deleteFish(props.index)}>
        Remove Fish
      </button>
    </form>
  )
}

EditFishForm.propTypes = {
  editFish: PropTypes.func.isRequired,
  deleteFish: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
  fish: PropTypes.shape({
    name: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
}

export default EditFishForm
