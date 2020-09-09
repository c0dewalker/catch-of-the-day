import React from 'react'
import {formatPrice} from '../../../helpers'
import PropTypes from 'prop-types'

const Fish = (props) => {
  const {name, desc, price, image, status} = props.details
  const isAvailable = status === 'available'
  return (
    <div className="single-fish">
      <img src={image} alt={name}/>
      <h3 className="fish-name">{name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>
      <button disabled={!isAvailable} onClick={() => props.addToOrder(props.index)}>
        {isAvailable ? 'Add To Cart' : 'Sold Out!'}
      </button>
    </div>
  )
}

Fish.propTypes = {
  addToOrder: PropTypes.func.isRequired,
  details: PropTypes.shape({
    desc: PropTypes.string,
    image: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number
  }).isRequired
}

export default Fish