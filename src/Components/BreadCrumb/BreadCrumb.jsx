import React from 'react'
import './BreadCrumb.css'
import arrow_icon from '../../assets/Frontend_Assets/breadcrum_arrow.png'
import { Link, Links } from 'react-router-dom';

function BreadCrumb({ product }) {
  if (!product) return null;

  return (
    <div className="breadcrumb">
      <Link to="/">HOME</Link>
      <img src={arrow_icon} alt="" />
      <a href="/">SHOP</a>
      <img src={arrow_icon} alt="" />
      {product.category=='kid' ? 
       <Link to={`/${product.category}s`}><span>{product.category}</span></Link> :
       <Link to={`/${product.category}`}><span>{product.category}</span></Link>
     
    }
      <img src={arrow_icon} alt="" />
      <span>{product.name}</span>
    </div>
  );
}
 export default BreadCrumb

