import React from 'react'
import Item from '../Item/Item'
import './RelatedProducts.css'
// import { useState,useEffect } from 'react'
// import axios from 'axios'



function RelatedProducts(props) {
  // const [relatedProducts,setRelatedProducts]=useState([])

  // useEffect(()=>{
  //   const fetchRelatedProducts=async()=>{
  //    try {
  //     let response = await axios.get(`http://localhost:4000/relatedProducts/${props.category}`);
  //     setRelatedProducts(response.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   }
  //   fetchRelatedProducts()
  // },[])
  let relatedProducts=props.relatedProducts
  return (
    <div className='relatedProducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="related-item-container">
            {
                relatedProducts.map((item,index)=>{
                    return <Item key={index} id={item.id} img={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}/>
                })
            }
        </div>
    </div>
  )
}

export default RelatedProducts
