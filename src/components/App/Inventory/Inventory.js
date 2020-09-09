import React from 'react'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import AddFishForm from "./AddFishForm/AddFishForm"
import EditFishForm from "./EditFishForm/EditFishForm"
import Login from "./Login/Login"
import base, {firebaseApp} from "../../../base";

class Inventory extends React.Component {
  static propTypes = {
    editFish: PropTypes.func.isRequired,
    addFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
    fishes: PropTypes.object.isRequired
  }

  state = {
    userId: null,
    owner: null
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user)
        this.authHandler({user})
    })
  }

  authHandler = async (authData) => {
    const store = await base.fetch(this.props.storeId, {context: this})
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    this.setState({
      userId: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
  }

  logout = async () => {
    await firebase.auth().signOut()
    this.setState({ userId: null })
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>

    if (!this.state.userId)
      return <Login authenticate={this.authenticate}/>

    if (this.state.userId !== this.state.owner)
      return (
        <div>
          <p>Sorry, you are not the owner of the store!</p>
          {logout}
        </div>
      )

    return (
      <div className="inventory">
        {logout}
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
