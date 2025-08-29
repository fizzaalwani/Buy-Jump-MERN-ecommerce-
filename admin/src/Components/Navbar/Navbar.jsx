import React from 'react'
import nav_logo from '../../assets/Admin_Assets/nav-logo.svg'
import dropdown from '../../assets/Admin_Assets/arrow_icon.svg'
import profile from '../../assets/Admin_Assets/nav-profile.svg'
import './Navbar.css'

function Navbar() {
  return (
    <div className='admin-nav'>
       <div className="logo">
        <div className="img">
            <img src={nav_logo} alt="" />
        </div>
        <div className="nav-headings">
            <p>Buy-Jump</p>
            <p>Admin panel</p>
        </div>
       </div>

       <div className="admin-profile">
        <div className="admin-img">
            <img src={profile} alt="" />
            <img src={dropdown} alt="" />
        </div>
       </div>


    </div>
  )
}

export default Navbar
