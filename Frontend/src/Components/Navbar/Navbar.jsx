import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/Frontend_Assets/logo.png';
import cart_icon from '../../assets/Frontend_Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { IoMdSearch } from "react-icons/io";
import dropdown_icon from '../../assets/Frontend_Assets/dropdown_icon.png'
import SearchEngine from '../SearchEngine/SearchEngine';


function Navbar({setShowSearchBar}) {
    const [menu,setMenu]=useState('Shop')
    // const [showSearchBar,setShowSearchBar]=useState(false)
    const {getNoOfCartItems}=useContext(ShopContext)
    const navMenuRef=useRef(null)

    const toggleMenu=()=>{
      navMenuRef.current.classList.toggle('open')
    }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>Buy-Jump</p>
      </div>
     
     <ul className="nav-menu" ref={navMenuRef}>
       <Link to='/' style={{textDecoration:'none'}}><li onClick={()=>setMenu('Shop')} className={menu=='Shop' ? 'active' : ''}>
            Shop</li></Link> 
         <Link to='/men' style={{textDecoration:'none'}}><li onClick={()=>setMenu('Men')}  className={menu=='Men' ? 'active' : ''}>
            Men</li></Link> 
         <Link to='/women' style={{textDecoration:'none'}}><li onClick={()=>setMenu('Women')}  className={menu=='Women' ? 'active' : ''}>
            Women</li></Link> 
        <Link to='/kids' style={{textDecoration:'none'}}> <li onClick={()=>setMenu('Kids')}  className={menu=='Kids' ? 'active' : ''}>
            Kids</li></Link> 
     </ul>
     <div className="nav-login-cart">
       <img src={dropdown_icon} alt=""  onClick={()=>toggleMenu()} className="menu-toggle"/>

       {
       localStorage.getItem("auth-token") ? <button onClick={()=>localStorage.removeItem("auth-token")}>Logout</button> :   <Link to='/login'><button>Login</button></Link>
       }
       <Link to='/cart'><div className="cart-icon">
          <img src={cart_icon} alt="Cart Icon" />
          <span className="cart-count">{getNoOfCartItems()}</span>
          </div></Link>
            <div onClick={()=>setShowSearchBar(prev=>!prev)}><IoMdSearch size={24}
            style={{color:"var(--color-heading)"}} className='search-icon'/></div>
     </div>
   

    </div>
  )
}

export default Navbar
