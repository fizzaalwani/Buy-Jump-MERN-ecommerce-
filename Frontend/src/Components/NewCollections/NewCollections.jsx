import React from 'react'
import './NewCollections.css'
import collection from '../../assets/Frontend_Assets/new_collections'
import Item from '../Item/Item'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function NewCollections() {
  const [newcollection,setnewcollection]=useState([])

  useEffect(()=>{
    const fetchNewCollection=async()=>{
      try{
      let response=await axios.get("http://localhost:4000/product/newcollection")
      setnewcollection(response.data)
      // console.log(response.data)
      }catch(err){
        console.log(err.response? err.response.message : err.message)
      }
     
    }
    fetchNewCollection()
  },[])
  return (
    <div className='new-collections'>
       <h1>New Collections</h1>
        <hr />
        <div className="collections-item-container">
            {
                newcollection.map((item,index)=>{
                    return <Item key={index} id={item.id} img={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}/>
                })
            }
        </div>
    </div>
  )
}

export default NewCollections
