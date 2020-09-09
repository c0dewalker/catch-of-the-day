import React from 'react'
import PropTypes from 'prop-types'
import { getFunName } from "../../helpers"

class StorePicker extends React.Component {
  myInput = React.createRef()

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  goToStore = (e) => {
    e.preventDefault()
    const storeName = this.myInput.current.value
    this.props.history.push(`/store/${storeName}`)
  }

  render() {
    return (
      <form onSubmit={this.goToStore} className="store-selector">
        <h2>Please Enter A Store</h2>
        <input ref={this.myInput} type="text" required placeholder="Store Name" defaultValue={getFunName()}/>
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

export default StorePicker