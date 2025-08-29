import React from 'react'
import girl_image from '../../assets/Frontend_Assets/exclusive_image.png'
import './Offers.css'

function Offers() {
  return (
    <div className='offers'>
       <div className="left-offers">
             <h1>Exclusive</h1>
             <h1>Offers for you</h1>
             <p>ONLY ON BEST SELLERS PRODUCTS</p>
              <button>Check Now</button>
             </div>
             <div className="right-offers">
              <img src={girl_image} alt="" />
             </div>
    </div>
  )
}

export default Offers
