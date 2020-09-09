import React from 'react'
import PropTypes from 'prop-types'
import {formatPrice} from '../../../helpers'

const Order = ({order, fishes, removeFromOrder}) => {

  const renderOrder = key => {
    const fish = fishes[key]
    if (!fish) return null
    const count = order[key]
    const isAvailable = fish.status === 'available'
    if (!isAvailable)
      return (
        <li key={key}>
          Sorry {fish ? fish.name : 'fish'} is no longer available
        </li>
      )
    return (
      <li key={key}>
        {count} kg {fish.name}
        <button onClick={() => removeFromOrder(key)}>&times;</button>
        {formatPrice(count * fish.price)}
      </li>
    )
  }

  const orderKeys = Object.keys(order)
  const total = orderKeys.reduce((prevTotal, key) => {
    const fish = fishes[key]
    const count = order[key]
    const isAvailable = fish && fish.status === 'available'
    return isAvailable ? prevTotal + fish.price * count : prevTotal
  }, 0)

  return (
    <div className="order-wrap">
      <h2>Order</h2>
      <ul className="order">{orderKeys.map(renderOrder)}</ul>
      <div className="total">Total:&nbsp;<strong>{formatPrice(total)}</strong></div>
    </div>
  )
}

Order.propTypes = {
  order: PropTypes.object.isRequired,
  fishes: PropTypes.object.isRequired,
  removeFromOrder: PropTypes.func.isRequired
}

export default Order
