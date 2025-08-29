import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

function Item(props) {
  
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`} style={{textDecoration:"none"}}><img onClick={window.scrollTo(0,0)}src={props.img[0]} alt="" />
       <p className='item-name'>{props.name}</p>
       <div className="item-prices">
        <div className="item-new-price">
            ${props.new_price}
        </div>
         <div className="item-old-price">
            ${props.old_price}
        </div>
       </div></Link> 
    </div>
  )
}

export default Item
