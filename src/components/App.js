import React from 'react'
import sampleFishes from '../sample-fishes'
import Header from './Header'
import Fish from "./Fish"
import Order from './Order'
import Inventory from './Inventory'
import base from '../base'

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  }

  componentDidMount() {
    const localStorageRef = localStorage.getItem(this.props.match.params.storeId)
    if (localStorageRef)
      this.setState({ order : JSON.parse(localStorageRef) })
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addFish = (fish) => {
    this.setState({
      fishes: {...this.state.fishes, [`fish${Date.now()}`]: fish}
    })
  }

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes})
  }

  addToOrder = (key) => {
    const order = {...this.state.order}
    order[key] = order[key] + 1 || 1
    this.setState({order})
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul>
            {Object.keys(this.state.fishes).map(key => (
              <li key={key} className="menu-fish">
                <Fish details={this.state.fishes[key]} addToOrder={this.addToOrder} index={key}/>
              </li>
            ))}
          </ul>
        </div>
        <Order order={this.state.order} fishes={this.state.fishes}/>
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
      </div>
    )
  }
}

export default App
