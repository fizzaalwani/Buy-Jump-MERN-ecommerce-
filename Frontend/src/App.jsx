import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory/ShopCategory'
import LoginSignUp from './Pages/LoginSignUp/LoginSignUp'
import Product from './Pages/Product/Product'
import men_banner from './assets/Frontend_Assets/banner_mens.png'
import women_banner from './assets/Frontend_Assets/banner_women.png'
import kids_banner from './assets/Frontend_Assets/banner_kids.png'
import Footer from './Components/Footer/Footer'
import Cart from './Pages/Cart/cart'
import NotFound from './Components/NotFound/NotFound'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop/>}></Route>
          <Route path='/men' element={<ShopCategory banner={men_banner} category="men" />}></Route>
          <Route path='/women' element={<ShopCategory banner={women_banner} category="women" />}></Route>
          <Route path='/kids' element={<ShopCategory banner={kids_banner}  category="kid" />}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
         <Route path="/product/:productId" element={<Product />} />
          <Route path='/login' element={<LoginSignUp />}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>

    </>
  )
}

export default App
