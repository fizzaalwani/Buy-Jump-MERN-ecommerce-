import React, { useContext } from 'react'
import './ProductDisplay.css'
import star from '../../assets/Frontend_Assets/star_icon.png'
import dull_star from '../../assets/Frontend_Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

function ProductDisplay(props) {
    let product=props.product
    let addToCart=useContext(ShopContext)
    addToCart=addToCart.addToCart
    
  return (
    <div className='productDisplay'>
       <div className="left">
        <div className="img-list">
            <img src={product.image} alt="" />
             <img src={product.image} alt="" />
              <img src={product.image} alt="" />
               <img src={product.image} alt="" />
        </div>
        <div className="img-main">
             <img src={product.image} alt="" />
        </div>
       </div>
       <div className="right">
        <div className="p-title">{product.name}</div>
        <div className="p-ratings">
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={dull_star} alt="" />
      <p className='p-reviews'>(122)</p>
        </div>
        <div className="p-prices">
            <div className="p-old_price">${product.old_price}</div>
            <div className="p-new_price">${product.new_price}</div>
        </div>
        <div className="p-about">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem non dolores, fugiat neque vitae laborum, nobis error nam delectus soluta quas consequatur unde veritatis cupiditate veniam consectetur, eaque esse labore.
        </div>
        <div className="p-size">
            <p>Select Sizes</p>
            <div className="size-range">
                <div>S</div>
                <div>X</div>
                <div>L</div>
                <div>ML</div>
                <div>XXI</div>
            </div>
        </div>
        <div className="btn">
            <button onClick={()=> addToCart(product.id)}>Add To Cart</button>
        </div>
        <div className="hastags">
            <div className="category">
              <p>Category : </p>
              <p>Women,Tshirt,CropTop</p>
            </div>
            <div className="tags">
                <p>tags : </p>
                <p>Modern Latest</p>
            </div>
        </div>

       </div>
    </div>
  )
}

export default ProductDisplay
