import React from 'react'
import './Item.css'

function Item(props) {
  return (
    <div className='item'>
       <img src={props.img} alt="" />
       <p>{props.name}</p>
       <div className="item-prices">
        <div className="item-new-price">
            ${props.new_price}
        </div>
         <div className="item-old-price">
            ${props.old_price}
        </div>
       </div>
    </div>
  )
}

export default Item
