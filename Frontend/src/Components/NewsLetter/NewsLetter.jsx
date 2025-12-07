import React, { useState } from 'react'
import './NewsLetter.css'
import axios from 'axios'

function NewsLetter() {
  const [email, setEmail] = useState('')

  const subscribe = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/subscriber/add`, {email},{
        headers:{
          "Content-Type":"application/json"
        }
      })
      console.log(response.data.message)
    
      // alert("subscribed")
      setEmail('')
    } catch (err) {
      console.log(err.message || err.response.data.message)
    }

  }
  return (
    <div className='newsletter'>
      <h1>Get exclusive offers on your email</h1>
      <p>Subscribe to our new channel and stay updated</p>
      <div>
        <input type="email" placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={subscribe}>Subscribe</button>
      </div>
    </div>
  )
}

export default NewsLetter
