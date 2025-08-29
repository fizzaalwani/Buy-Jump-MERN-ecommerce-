import React, { useContext ,useState,useEffect} from 'react'
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import { ShopContext } from '../../Context/ShopContext'
import { useParams } from 'react-router-dom'
import ProductDisplay from '../../Components/ProductDisplay/ProductDisplay'
import './Product.css'
import DescriptionBox from '../../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../../Components/RelatedProducts/RelatedProducts'
import axios from 'axios'

function Product() {
  const products=useContext(ShopContext).products
  const productData=useParams().productId
  const selectedProduct=products.find((p)=> String(p.id)===String(productData))

  const [relatedProducts,setRelatedProducts]=useState([])

    useEffect(()=>{
      const fetchRelatedProducts=async()=>{
       try {
        let response = await axios.get(`http://localhost:4000/relatedProducts/${selectedProduct.category}/${selectedProduct._id}`);
        setRelatedProducts(response.data);
      } catch (err) {
        console.error(err);
      }
      }
      fetchRelatedProducts()
    },[selectedProduct])

  return (
    <div className='product'>
      <BreadCrumb product={selectedProduct}/>
      <ProductDisplay product={selectedProduct}/>
      <DescriptionBox/>
      <RelatedProducts category={selectedProduct.category} relatedProducts={relatedProducts}/>
    </div>
  )
}

export default Product
