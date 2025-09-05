import React, { useContext } from 'react'
import './LoginSignUp.css'
import { useState } from 'react'
import axios from 'axios'
import { ShopContext } from '../../Context/ShopContext'



function LoginSignUp() {

  const {url}=useContext(ShopContext)

  const [state, setState] = useState("Login")
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const login = async () => {
    console.log("Form Data : ", formData)
    try {
      let responseData = await axios.post("http://localhost:4000/user/login", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (responseData.data.success) {
        localStorage.setItem("auth-token",responseData.data.token)
        setFormData({
          username: '',
          email: '',
          password: ''
        })
        window.location.replace('/')
      }else{
          alert(responseData.data.message)
      }
    } catch (err) {
      alert(err.response ? err.response.data.message : err.message)
    }

  }

  const signup = async() => {
    console.log("Form Data : ", formData)
    try {
      let responseData = await axios.post("http://localhost:4000/user/signup", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (responseData.data.success) {
        localStorage.setItem("auth-token", responseData.data.token)
        setFormData({
          username: '',
          email: '',
          password: ''
        })
        // setState("Login")
        window.location.replace('/')
      }else{
          alert(responseData.data.message)
      }
    } catch (err) {
      alert(err.response ? err.response.data.message : err.message)
    }

  }
  return (
    <div className='loginSignUp'>
      <h1>{state}</h1>
      <div className="form">
        {state === "Login" ? (<><input type="email" name="email" id="email"
          value={formData.email} onChange={(e) => handleChange(e)}
          placeholder='Enter your Email' />
          <input type="password" name="password" id="password"
            value={formData.password} onChange={(e) => handleChange(e)}
            placeholder='Enter your Password' />
          <button onClick={() => login()}>Continue</button> </>)
          :
          (
            (
              <> <input type="text" name='username' value={formData.username}
                onChange={(e) => handleChange(e)}
                placeholder='Enter your username' />

                <input type="email" name="email" id="email" value={formData.email}
                  onChange={(e) => handleChange(e)}
                  placeholder='Enter your Email' />

                <input type="password" name="password" id="password" value={formData.password} onChange={(e) => handleChange(e)}
                  placeholder='Enter your Password' />
                <button onClick={() => signup()}>Continue</button>
              </>
            )
          )}

      </div>

      <div className="accountExists">
        {state === "Login" ? <p>Create a new account <span onClick={() => setState("SignUp")}>Sign Up Here</span></p> :
          (<> <p>Already have an account <span onClick={() => setState("Login")}>Login Here</span></p>
            <div className="checkbox">
              <input type="checkbox" />
              <p>By continuing I agree to the terms of use & privacy policy</p>
            </div> </>)
        }

      </div>

    </div>
  )
}

export default LoginSignUp
