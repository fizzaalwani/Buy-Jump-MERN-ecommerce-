import React from 'react'
import add_product from '../../assets/Admin_Assets/Product_Cart.svg'
import display_produt from '../../assets/Admin_Assets/Product_list_icon.svg'
import './Sidebar.css'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='sidebar'>
       <div className="add-p">
        <Link to='/addproduct' style={{textDecoration:"none"}}>
        <img src={add_product} alt="" />
        <p>Add Product</p>
        </Link>
        
       </div>
       <div className="display-p">
       <Link to='/' style={{textDecoration:"none"}}>
        <img src={display_produt} alt="" />
        <p>Display Product</p>
        </Link>
       </div>
    </div>
  )
}

export default Sidebar
