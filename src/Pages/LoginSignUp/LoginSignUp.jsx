import React from 'react'
import './LoginSignUp.css'

function LoginSignUp() {
  return (
    <div className='loginSignUp'>
      <h1>Sign Up</h1>
      <div className="form">
        <input type="text" name='name' placeholder='Enter your Name'/>
        <input type="email" name="email" id="email" placeholder='Enter your Email'/>
        <input type="password" name="password" id="password" placeholder='Enter your Password'/>
        <button>Continue</button>
      </div>
      <div className="accountExists">
        <p>Already have an account <span>Login Here</span></p>
      </div>
      <div className="checkbox">
        <input type="checkbox" />
        <p>By continuing I agree to the terms of use & privacy policy</p>
      </div>
    </div>
  )
}

export default LoginSignUp
