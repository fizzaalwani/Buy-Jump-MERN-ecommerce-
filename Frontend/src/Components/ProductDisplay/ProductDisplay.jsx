import React, { useContext } from 'react'
import './ProductDisplay.css'
import star from '../../assets/Frontend_Assets/star_icon.png'
import dull_star from '../../assets/Frontend_Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from 'react'

function ProductDisplay(props) {

    let product = props.product
    let addToCart = useContext(ShopContext)
    addToCart = addToCart.addToCart
    const [mainImg, setMainImg] = useState(0)
    const [hover, setHover] = useState(false)
    const [position, setPosition] = useState({
        x: 50,
        y: 50
    })


    const handleOnMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect()
        const x = ((e.clientX - left) / width) * 100 // percentage
        const y = ((e.clientY - top) / height) * 100 // percentage
        setPosition({ x, y })
        setHover(true)
    }

    return (
        <div className='productDisplay'>
            <div className="left">
                <div className="img-list">

                    {product?.image?.map((img, index) => (
                        index === mainImg ? <img src={img} alt="" key={index} onClick={() => setMainImg(index)} /> :
                            <img src={img} alt="" key={index} onClick={() => setMainImg(index)} style={{ opacity: "0.5" }} />

                    ))}

                    {/* <img src={product.image} alt="" />
             <img src={product.image} alt="" />
              <img src={product.image} alt="" />
               <img src={product.image} alt="" /> */}
                </div>
                <div className='accordian-img'>
                    <IoIosArrowBack style={{ color: 'var(--color-heading)', fontSize: '30px' }}
                        onClick={() => setMainImg(prev => (prev === 0 ? product?.image.length - 1 : prev - 1))}
                    />
                    <div className="img-main">
                        <img src={product.image[mainImg]} alt=""
                            onMouseEnter={() => setHover(true)}
                            onMouseMove={handleOnMouseMove}
                            onMouseLeave={() => setHover(false)} />
                    </div>
                    <IoIosArrowForward style={{ color: 'var(--color-heading)', fontSize: '30px' }}
                        onClick={() => setMainImg(prev => (prev === product?.image.length - 1 ? 0 : prev + 1))}
                    />
                </div>
                {
                    hover ? <div className='floating-box' style={{ backgroundImage: `url(${product.image[mainImg]})`, backgroundPosition: `${position.x}% ${position.y}%` }}></div> : ''
                }

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
                    <div className="p-old_price">Rs {product.old_price}</div>
                    <div className="p-new_price">Rs {product.new_price}</div>
                </div>
                <div className="p-about">{product.description}
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
                    <button onClick={() => addToCart(product.id)}>Add To Cart</button>
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
