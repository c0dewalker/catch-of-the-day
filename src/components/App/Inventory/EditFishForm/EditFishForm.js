import React from 'react'
import PropTypes from 'prop-types'

class EditFishForm extends React.Component {
  static propTypes = {
    editFish: PropTypes.func,
    deleteFish: PropTypes.func,
    index: PropTypes.string,
    fish: PropTypes.shape({
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.number,
    })
  }

  handleChange = (e) => {
    const updatedFish = {
      ...this.props.fish,
      [e.currentTarget.name]: e.currentTarget.value
    }
    this.props.editFish(updatedFish, this.props.index)
  }

   render() {
    const {name, price, desc, status, image} = this.props.fish
    return (
      <form className="fish-edit">
        <input onChange={this.handleChange} type="text" name="name" value={name} />
        <input onChange={this.handleChange} type="text" name="price" placeholder="Price" value={price}/>
        <select onChange={this.handleChange} name="status" value={status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea onChange={this.handleChange} name="desc" cols="30" rows="10" value={desc}></textarea>
        <input onChange={this.handleChange} type="text" name="image" value={image}/>
        <button onClick={()=> this.props.deleteFish(this.props.index)}>Remove Fish</button>
      </form>
    )
  }
}

export default EditFishForm