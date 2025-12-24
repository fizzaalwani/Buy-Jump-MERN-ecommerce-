import React, { useState , Suspense} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Shop from './Pages/Shop'
// import ShopCategory from './Pages/ShopCategory/ShopCategory'
// import LoginSignUp from './Pages/LoginSignUp/LoginSignUp'
import Product from './Pages/Product/Product'
import men_banner from './assets/Frontend_Assets/banner_mens.png'
import women_banner from './assets/Frontend_Assets/banner_women.png'
import kids_banner from './assets/Frontend_Assets/banner_kids.png'
// import Footer from './Components/Footer/Footer'
// import Cart from './Pages/Cart/Cart'
// import NotFound from './Components/NotFound/NotFound'
// import SearchEngine from './Components/SearchEngine/SearchEngine'

const ShopCategory=React.lazy(()=>import ('./Pages/ShopCategory/ShopCategory'))
const Shop=React.lazy(()=> import('./Pages/Shop'))
const LoginSignUp=React.lazy(()=> import('./Pages/LoginSignUp/LoginSignUp'))
// const Product=React.lazy(()=> import('./Pages/Product/Product'))
const Footer=React.lazy(()=> import('./Components/Footer/Footer'))
const Cart= React.lazy(()=> import('./Pages/Cart/Cart'))
const NotFound=React.lazy(()=> import('./Components/NotFound/NotFound'))
const SearchEngine=React.lazy(()=> import('./Components/SearchEngine/SearchEngine'))

function App() {
  const [showSearchBar,setShowSearchBar]=useState(false)

//   useEffect(() => {
//   if (showSearchBar) {
//     document.body.style.overflow = "hidden"; // stop scrolling
//   } else {
//     document.body.style.overflow = "auto"; // restore scroll
//   }
// }, [showSearchBar]);

  return (
    <>
    <div className='app'>
      <BrowserRouter>
      {showSearchBar && <SearchEngine setShowSearchBar={setShowSearchBar}/>}
        <Navbar  setShowSearchBar={setShowSearchBar}/>
        <Suspense fallback={<p>Loading...</p>}>
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
        </Suspense>
        <Footer/>
      </BrowserRouter>
</div>
    </>
  )
}

export default App
