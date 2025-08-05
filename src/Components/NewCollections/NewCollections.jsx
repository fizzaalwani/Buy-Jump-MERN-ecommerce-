import React from 'react'
import './NewCollections.css'
import collection from '../../assets/Frontend_Assets/new_collections'
import Item from '../Item/Item'

function NewCollections() {
  return (
    <div className='new-collections'>
       <h1>New Collections</h1>
        <hr />
        <div className="collections-item-container">
            {
                collection.map((item,index)=>{
                    return <Item key={index} id={item.id} img={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}/>
                })
            }
        </div>
    </div>
  )
}

export default NewCollections
