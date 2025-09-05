import React, { createContext, useState } from "react";
import axios from 'axios'
import { useEffect } from "react";



export const ShopContext = createContext(null)

function ShopContextProvider(props) {
  const url="http://localhost:4000"
  const [cartItems, setCartItems] = useState({})
  const [products, setProducts] = useState([])

  const addToCart = async(id) => {
    setCartItems((prev) => {
      const quantity = prev[id] || 0
      return { ...prev, [id]: quantity + 1 }
    })

    if(localStorage.getItem('auth-token')){
      let response=await axios.post(`${url}/cart/add`,{ pId: id, quantity: 1 },{
        headers:{
          'auth-token':localStorage.getItem('auth-token'),
          "Content-Type":"application/json"
        }
      })
      console.log(cartItems)
      
    }

  }

  const removeFromCart =async (id,quantity) => {
    setCartItems((prev) => {
      if (!prev[id]) return prev; // If not in cart, return unchanged
      const newCart = { ...prev };
      delete newCart[id];
      return newCart;

    });
     if(localStorage.getItem('auth-token')){
      let response=await axios.post(`${url}/cart/remove`,{ pId: id, quantity },{
        headers:{
          'auth-token':localStorage.getItem('auth-token'),
          "Content-Type":"application/json"
        }
      })
      console.log("Cart Items : ",cartItems)
      getNoOfCartItems()
      getCartTotal()
    }
  };

  const getCartTotal = () => {
    let totalAmount = 0
    for (const item in cartItems) {
      let product = products.find((p) => p.id === item)
      product ? totalAmount += product.new_price * cartItems[item] : totalAmount
    }
    return totalAmount
  }

  const getNoOfCartItems = () => {
    let total = 0
    for (let item in cartItems) {
      total += cartItems[item]
    }
    return total
  }

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        let response = await axios.get(`${url}/product/display`);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const getCartProducts=async()=>{
      if(localStorage.getItem('auth-token')){
        let response=await axios.get(`${url}/cart/get`,{
          headers:{
            'auth-token':localStorage.getItem('auth-token')
          }
        })
        // console.log(response.data)
        setCartItems(response.data)
      }
    }
    getAllProducts()
    getCartProducts()

  }, []);

  const context_value = { products, cartItems, addToCart, removeFromCart, getCartTotal, getNoOfCartItems,url }
  return (
    <>
      <ShopContext.Provider value={context_value}>
        {props.children}
      </ShopContext.Provider>
    </>
  )
}

export default ShopContextProvider;