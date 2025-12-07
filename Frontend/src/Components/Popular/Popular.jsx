import React from 'react'
import './Popular.css'
import Item from '../Item/Item'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function Popular() {
  const [popular,setPopular]=useState([])

  useEffect(()=>{
    const fetchPopular=async()=>{
      let response=await axios.get("http://localhost:4000/product/popularinwomen")
        setPopular(response.data)
        console.log("Popular in women response : ",response)
        console.log("Popular in Women :",response.data)
      
    }
    fetchPopular()
  },[])
  return (
    <div className='popular'>
        <h1>Popular in Women</h1>
        <hr />
        <div className="popular-item-container">
            {
                popular.map((item,index)=>{
                    return <Item key={index} id={item.id} img={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}/>
                })
            }
        </div>

      
    </div>
  )
}

export default Popular
