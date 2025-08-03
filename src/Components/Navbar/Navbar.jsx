import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../assets/Frontend_Assets/logo.png';
import cart_icon from '../../assets/Frontend_Assets/cart_icon.png';
import { Link } from 'react-router-dom';


function Navbar() {
    const [menu,setMenu]=useState('Shop')

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>Buy-Jump</p>
      </div>
     <ul className="nav-menu">
       <Link to='/' style={{textDecoration:'none'}}><li onClick={()=>setMenu('Shop')} className={menu=='Shop' ? 'active' : ''}>
            Shop</li></Link> 
         <Link to='/mens' style={{textDecoration:'none'}}><li onClick={()=>setMenu('Men')}  className={menu=='Men' ? 'active' : ''}>
            Men</li></Link> 
         <Link to='/womens' style={{textDecoration:'none'}}><li onClick={()=>setMenu('Women')}  className={menu=='Women' ? 'active' : ''}>
            Women</li></Link> 
        <Link to='/kids' style={{textDecoration:'none'}}> <li onClick={()=>setMenu('Kids')}  className={menu=='Kids' ? 'active' : ''}>
            Kids</li></Link> 
     </ul>
     <div className="nav-login-cart">
        <Link to='/login'><button>Login</button></Link>
       <Link to='/cart'><div className="cart-icon">
          <img src={cart_icon} alt="Cart Icon" />
          <span className="cart-count">0</span>
          </div></Link>
     </div>

    </div>
  )
}

export default Navbar
