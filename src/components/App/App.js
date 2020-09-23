import React from 'react'
import PropTypes from 'prop-types'
import sampleFishes from '../../sample-fishes'
import Header from './Header/Header'
import Fish from './Fish/Fish'
import Order from './Order/Order'
import Inventory from './Inventory/Inventory'
import base from '../../base'

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  }
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const localStorageRef = localStorage.getItem(
      this.props.match.params.storeId
    )
    if (localStorageRef) this.setState({ order: JSON.parse(localStorageRef) })
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    )
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  editFish = (updatedFish, key) => {
    const fishes = { ...this.state.fishes }
    fishes[key] = updatedFish
    this.setState({ fishes })
  }

  addFish = (fish) => {
    this.setState({
      fishes: { ...this.state.fishes, [`fish${Date.now()}`]: fish },
    })
  }

  deleteFish = (key) => {
    const fishes = { ...this.state.fishes }
    fishes[key] = null
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addToOrder = (key) => {
    const order = { ...this.state.order }
    order[key] = order[key] + 1 || 1
    this.setState({ order })
  }

  removeFromOrder = (key) => {
    const updatedOrder = { ...this.state.order }
    delete updatedOrder[key]
    this.setState({ order: updatedOrder })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul>
            {Object.keys(this.state.fishes).map((key) => (
              <li key={key} className="menu-fish">
                <Fish
                  details={this.state.fishes[key]}
                  addToOrder={this.addToOrder}
                  index={key}
                />
              </li>
            ))}
          </ul>
        </div>
        <Order
          order={this.state.order}
          fishes={this.state.fishes}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          editFish={this.editFish}
          addFish={this.addFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    )
  }
}

export default App
