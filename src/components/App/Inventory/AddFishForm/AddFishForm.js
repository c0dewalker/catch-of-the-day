import React from 'react'
import PropTypes from 'prop-types'

const AddFishForm = (props) => {
  const nameRef = React.createRef()
  const priceRef = React.createRef()
  const statusRef = React.createRef()
  const descRef = React.createRef()
  const imageRef = React.createRef()

  const addFish = (e) => {
    e.preventDefault()
    const fish = {
      name: nameRef.current.value,
      price: parseFloat(priceRef.current.value),
      status: statusRef.current.value,
      desc: descRef.current.value,
      image: imageRef.current.value,
    }
    props.addFish(fish)
    e.target.reset()
  }

  return (
    <form onSubmit={addFish} className="fish-edit">
      <input ref={nameRef} type="text" name="name" placeholder="Name"/>
      <input ref={priceRef} type="text" name="price" placeholder="Price"/>
      <select ref={statusRef} name="status">
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out</option>
      </select>
      <textarea ref={descRef} name="desc" id="" cols="30" rows="10"></textarea>
      <input ref={imageRef} type="text" name="image" placeholder="Image"/>
      <button type="submit">+ Add Fish</button>
    </form>
  )
}

AddFishForm.propTypes = {
  addFish: PropTypes.func.isRequired
}

export default AddFishForm