import React from 'react'
import './Hero.css'
import hand from '../../assets/Frontend_Assets/hand_icon.png'
import girl_image from '../../assets/Frontend_Assets/hero_image.png'

function Hero() {
  return (
    <div className='hero-section'>
       <div className="left-hero">
        <p>New Arrivals only</p>
        <p><span>new <img src={hand} alt="" /></span>
            collections for everyone</p>
        <button>Latest Collection <img src="" alt="" /></button>
       </div>
       <div className="right-hero">
        <img src={girl_image} alt="" />
       </div>
    </div>
  )
}

export default Hero
