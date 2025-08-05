import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import drop_down from '../../assets/Frontend_Assets/dropdown_icon.png'
import Item from '../../Components/Item/Item'
import './ShopCategory.css'

function ShopCategory(props) {
  let products = useContext(ShopContext)
  // console.log("From Shop CATEGORY :",products)
  products=products.products
  return (
    <div className='shopcategory'>
      <div className="category-banner"><img src={props.banner} alt="" /></div>
      <div className="sort">
        <p>Showing 1-12 out o 36 products</p>
        <button>Sort by <img src={drop_down} alt="" /></button>
      </div>
      <div className="shopcategory-container">
        {
          products.map((item,index)=>{
            if(item.category==props.category){
              return <Item key={index} id={item.id} img={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price}/>
            }else{
               return null
            }
           
          })
        }
      </div>
      
    </div>
  )
}

export default ShopCategory
