import React, { createContext, useState } from "react";
import products from '.././assets/Frontend_Assets/all_product'
import { useEffect } from "react";


export const ShopContext=createContext(null)

function ShopContextProvider(props){
    const [cartItems,setCartItems]=useState({})
    const addToCart=(id)=>{
       setCartItems((prev)=>{
        const quantity=prev[id] || 0
        return {...prev,[id]:quantity+1}
       })
       
    }
   const removeFromCart = (id) => {
    setCartItems((prev) => {
      if (!prev[id]) return prev; // If not in cart, return unchanged
      const newCart = { ...prev };
        delete newCart[id];
      return newCart;
   
    });
  };
  const getCartTotal=()=>{
    let totalAmount=0
    for(const item in cartItems){
      let product=products.find((p)=> p.id===Number(item))
      product ? totalAmount+=product.new_price*cartItems[item] : totalAmount
    }
    return totalAmount
  }
  const getNoOfCartItems=()=>{
    let total=0
    for (let item in cartItems){
      total+=cartItems[item]
    }
    return total
  }
   useEffect(() => {
    console.log("Cart updated:", cartItems);
  }, [cartItems]);
    const context_value={products,cartItems,addToCart,removeFromCart,getCartTotal,getNoOfCartItems}
    return(
    <>
    <ShopContext.Provider value={context_value}>
     {props.children}
    </ShopContext.Provider>
    </>
    )
}

export default ShopContextProvider;