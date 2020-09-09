import React from 'react'
import PropTypes from 'prop-types'

const Login = ({authenticate}) => (
  <nav className="login">
    <h2>inventory login</h2>
    <p>Sign in to manage store`s inventory</p>
    <button onClick={()=> authenticate('Github')} className="github">Log In With Github</button>
    <button onClick={()=> authenticate('Twitter')} className="twitter">Log In With Twitter</button>
    <button onClick={()=> authenticate('Facebook')} className="facebook">Log In With Facebook</button>
  </nav>
)
Login.propTypes = {
  authenticate: PropTypes.func.isRequired
}

export default Login