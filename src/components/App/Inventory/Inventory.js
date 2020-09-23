import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import AddFishForm from './AddFishForm/AddFishForm'
import EditFishForm from './EditFishForm/EditFishForm'
import Login from './Login/Login'
import base, { firebaseApp } from '../../../base'

const Inventory = (props) => {
  const [userId, setUserId] = useState(null)
  const [owner, setOwner] = useState(null)

  const authHandler = async (authData) => {
    const store = await base.fetch(props.storeId, { context: this })
    if (!store.owner) {
      await base.post(`${props.storeId}/owner`, {
        data: authData.user.uid,
      })
    }
    setUserId(authData.user.uid)
    setOwner(store.owner || authData.user.uid)
  }

  const authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()
    firebaseApp.auth().signInWithPopup(authProvider).then(authHandler)
  }

  const logout = async () => {
    await firebase.auth().signOut()
    setUserId(null)
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) authHandler({ user })
    })
  }, [])

  const logoutButton = <button onClick={logout}>Log Out!</button>

  if (!userId) return <Login authenticate={authenticate} />

  if (userId !== owner)
    return (
      <div>
        <p>Sorry, you are not the owner of the store!</p>
        {logoutButton}
      </div>
    )

  return (
    <div className="inventory">
      {logout}
      {Object.keys(props.fishes).map((key) => (
        <EditFishForm
          editFish={props.editFish}
          deleteFish={props.deleteFish}
          fish={props.fishes[key]}
          index={key}
          key={key}
        />
      ))}
      <AddFishForm addFish={props.addFish} />
      <button onClick={props.loadSampleFishes}>Load Sample Fishes</button>
    </div>
  )
}

Inventory.propTypes = {
  editFish: PropTypes.func.isRequired,
  addFish: PropTypes.func.isRequired,
  deleteFish: PropTypes.func.isRequired,
  loadSampleFishes: PropTypes.func.isRequired,
  fishes: PropTypes.object.isRequired,
}

export default Inventory
