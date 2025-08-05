import React, { useContext } from 'react'
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import { ShopContext } from '../../Context/ShopContext'
import { useParams } from 'react-router-dom'
import ProductDisplay from '../../Components/ProductDisplay/ProductDisplay'
import './Product.css'
import DescriptionBox from '../../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../../Components/RelatedProducts/RelatedProducts'

function Product() {
  const products=useContext(ShopContext).products
  const productData=useParams().productId
  const selectedProduct=products.find((p)=> p.id===Number(productData))

  return (
    <div className='product'>
      <BreadCrumb product={selectedProduct}/>
      <ProductDisplay product={selectedProduct}/>
      <DescriptionBox/>
      <RelatedProducts/>
    </div>
  )
}

export default Product
