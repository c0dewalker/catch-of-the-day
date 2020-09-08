import React from 'react'
import AddFishForm from "./AddFishForm/AddFishForm"
import EditFishForm from "./EditFishForm/EditFishForm"
import PropTypes from 'prop-types'

class Inventory extends React.Component {
  static propTypes = {
    editFish: PropTypes.func,
    addFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    fishes: PropTypes.object
  }
  render() {
    return (
      <div className="inventory">
        {Object.keys(this.props.fishes).map(key =>
          <EditFishForm
            editFish={this.props.editFish}
            deleteFish={this.props.deleteFish}
            fish={this.props.fishes[key]}
            index={key}
            key={key}
          />)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory
