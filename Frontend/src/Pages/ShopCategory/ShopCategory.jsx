import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import drop_down from '../../assets/Frontend_Assets/dropdown_icon.png'
import Item from '../../Components/Item/Item'
import './ShopCategory.css'

function ShopCategory(props) {
  let products = useContext(ShopContext)
  // console.log("From Shop CATEGORY :",products)
  console.log("Products from category :", products)
  products = products.products
  const [sortType, setSortType] = useState('price-low')


 //filter by category
  const filteredProducts = useMemo(() => {
    return products.filter((item) => item.category == props.category)
  }, [products,props.category])

  //sort by dropdown values
  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts]

    switch (sortType) {
      case 'price-low':
        return sorted.sort((a, b) => a.new_price - b.new_price)
      case 'price-high':
        return sorted.sort((a, b) => b.new_price - a.new_price)
    }
  }, [filteredProducts, sortType])

  useEffect(()=>{
    console.log(sortedProducts)
  },[sortType,props.category])

  return (
    <div className='shopcategory'>
      <div className="category-banner"><img src={props.banner} alt="" /></div>

      {/* <div className="sort">

        <p>Showing 1-12 out o 36 products</p>
        <button>Sort by <img src={drop_down} alt="" /></button>
      </div> */}
      
      <div className="sort">
        <p>
          Showing 1–{sortedProducts.length} out of {filteredProducts.length} products
        </p>

        <div className="sort-dropdown">
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
          
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          {/* <img src={drop_down} alt="" /> */}
        </div>
      </div>

      <div className="shopcategory-container">
        {
          sortedProducts.map((item, index) => {
              return <Item key={index} id={item.id} img={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price} />

          })
        }
      </div>

    </div>
  )
}

export default ShopCategory
