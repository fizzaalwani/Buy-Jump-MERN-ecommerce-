import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory'
import Cart from './Pages/Cart'
import LoginSignUp from './Pages/LoginSignUp/LoginSignUp'
import Product from './Pages/Product'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop/>}></Route>
          <Route path='/mens' element={<ShopCategory category="men" />}></Route>
          <Route path='/womens' element={<ShopCategory category="women" />}></Route>
          <Route path='/kids' element={<ShopCategory category="kid" />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='product' element={<Product />}>
            <Route to='/:productId' element={<Product />} />
          </Route>
          <Route path='/login' element={<LoginSignUp />}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
