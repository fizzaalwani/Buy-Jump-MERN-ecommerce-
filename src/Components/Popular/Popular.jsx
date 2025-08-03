import React from 'react'
import './Popular.css'
import data from '../../assets/Frontend_Assets/data'
import Item from '../Item/Item'

function Popular() {
  return (
    <div className='popular'>
        <h1>Popular in Women</h1>
        <hr />
        <div className="popular-item-container">
            {
                data.map((item,index)=>{
                    return <Item key={index} img={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}/>
                })
            }
        </div>

      
    </div>
  )
}

export default Popular
