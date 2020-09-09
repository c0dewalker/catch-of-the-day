import React from 'react'
import PropTypes from 'prop-types'

class EditFishForm extends React.Component {
  static propTypes = {
    editFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    index: PropTypes.string.isRequired,
    fish: PropTypes.shape({
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.number,
    }).isRequired
  }

  handleChange = (e) => {
    const {name, value} = e.currentTarget
    const updatedFish = {
      ...this.props.fish,
      [name]: name === 'price'? parseFloat(value) : value
    }
    this.props.editFish(updatedFish, this.props.index)
  }

  render() {
    const {name, price, desc, status, image} = this.props.fish
    return (
      <form className="fish-edit">
        <input onChange={this.handleChange} type="text" name="name" value={name}/>
        <input onChange={this.handleChange} type="number" name="price" placeholder="Price" value={price}/>
        <select onChange={this.handleChange} name="status" value={status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea onChange={this.handleChange} name="desc" cols="30" rows="10" value={desc}></textarea>
        <input onChange={this.handleChange} type="text" name="image" value={image}/>
        <button type="button" onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
      </form>
    )
  }
}

export default EditFishForm