import React from 'react'
import {formatPrice} from '../helpers'

const Order = ({order, fishes}) => {

  const renderOrder = key => {
    const fish = fishes[key]
    const count = order[key]
    const isAvailable = fish.status === 'available'
    if (!fish) return null
    if (!isAvailable)
      return (
        <li key={key}>
          key={key}
          Sorry {fish ? fish.name : 'fish'} is no longer available
        </li>
      )
    return (
      <li key={key}>
        {count} kg {fish.name}
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

export default Order
