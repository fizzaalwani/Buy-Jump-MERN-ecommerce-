import React, { useContext, useMemo } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../../assets/Frontend_Assets/cart_cross_icon.png';

function CartItems() {
  const { products, cartItems, removeFromCart,getCartTotal } = useContext(ShopContext);

  const subtotal =useMemo(()=>{
    return  Object.keys(cartItems).reduce((total, id) => {
    const product = products.find(p => p.id === Number(id));
    return total + (product ? product.new_price * cartItems[id] : 0);
  }, 0);
  },[products,cartItems])

  return (
    <div className='cartItems'>
        <div className="cartItems-table">
      <div className="cartItems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {
        products.map((item, index) => {
          if (cartItems[item.id] > 0) {
            return (
              <div className="cartItems-format" key={index}>
                <img src={item.image[0]} alt="" className='item-image'/>
                <p>{item.name}</p>
                <p>Rs {item.new_price}</p>
                <button className='cartItems-quantity'>{cartItems[item.id]}</button>
                <p>Rs {item.new_price * cartItems[item.id]}</p>
                <img src={remove_icon} alt="Remove" onClick={() => removeFromCart(item.id,cartItems[item.id])} />
              </div>
            )
          }
          return null;
        })
      }
      </div>

      {/* Cart Totals Section */}
      <div className="cartItems-totals">
        <div className="cartItems-totals-left">
          <h3>Cart Totals</h3>
          <div className="totals-line">
            <span>Subtotal</span>
            <span>Rs {getCartTotal()}</span>
          </div>
          <div className="totals-line">
            <span>Shipping Fee</span>
            <span>Free</span>
          </div>
          <hr />
          <div className="totals-line total">
            <span>Total</span>
            <span>Rs {getCartTotal()}</span>
          </div>
          <button className="checkout-btn">PROCEED TO CHECKOUT</button>
        </div>

        {/* Promo Code */}
        <div className="cartItems-totals-right">
          <p>If you have a promo code, enter it here</p>
          <div className="promo-box">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
