import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import {Routes,Route} from 'react-router-dom'
import Voucher from '../../Components/Voucher/Voucher'

function Admin() {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>}/>
         <Route path='/' element={<ListProduct/>}/>
         <Route path='/voucher' element={<Voucher/>} />
         {/* <Route path="*" element={<Navigate to="/addproduct" replace />} /> */}
      </Routes>
    </div>
  )
}

export default Admin
