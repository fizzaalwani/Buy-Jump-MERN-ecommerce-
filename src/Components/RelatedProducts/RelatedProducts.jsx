import React from 'react'
import Item from '../Item/Item'
import data from '../../assets/Frontend_Assets/data'
import './RelatedProducts.css'


function RelatedProducts() {
  return (
    <div className='relatedProducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="related-item-container">
            {
                data.map((item,index)=>{
                    return <Item key={index} id={item.id} img={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}/>
                })
            }
        </div>
    </div>
  )
}

export default RelatedProducts
