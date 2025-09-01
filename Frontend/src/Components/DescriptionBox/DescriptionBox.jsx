import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import './DescriptionBox.css';

function DescriptionBox({ id }) {
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState(false)

  const getReviews = async () => {
    try {
      let response = await axios.get(`http://localhost:4000/review/get/${id}`)
      if (response.data.success) {
        setReviews(response.data.reviews)
        console.log(response.data.reviews)
      }
    } catch (err) {
      console.log(err.message)
      console.log(err.response)
    }

  }
  useEffect(() => {
    const getReviewss = async () => {
      await getReviews()
    }
    console.log("running useEffect reviews")
    getReviewss()
    setActiveTab('description')
  }, [id])

  return (
    <div className="description-box">
      <div className="db-tabs">
        <button
          className={activeTab === "description" ? "active" : ""}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={activeTab === "reviews" ? "active" : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews ({reviews.length})
        </button>
      </div>

      <div className="db-content">
        {activeTab === "description" ? (
          <p>
            Welcome to <strong>Buy-Jump</strong> — your one‑stop destination for premium
            fashion, accessories, and lifestyle products. Our e‑commerce platform is
            designed to deliver a seamless shopping experience with secure payments,
            fast delivery, and exceptional customer service.
            <br /><br />
            We curate the best quality products from trusted brands, ensuring you always
            find something you love. Whether you’re looking for the latest trends,
            timeless classics, or budget‑friendly deals, <strong>Buy-Jump</strong> has you covered.
            <br /><br />
            Shop with confidence because at <strong>Buy-Jump</strong>, your satisfaction is our priority.
          </p>
        ) : (
          <div className="reviews">
            {
              reviews.length>0 ?
              reviews.map((item,index) => {
                return (
                  <div className="review" key={index}>
                    <div className="profile">
                      <div className="circle">{item.email[0]}</div>
                      <div className="user_info">
                          <p className="review-user">{item.email}</p>
                          <p className='review-star'>
                           <FaStar/> <FaStar/> <FaStar/> <FaStar/> <FaStar/>
                          </p>
                      </div>
                    </div>
                  
                    <p className="review-text">{item.review}</p>
                  </div>
                )
              }) : <div style={{textAlign:"center"}}>Be the first to leave a review</div>
            }


          </div>
        )}
      </div>
    </div>
  );
}

export default DescriptionBox;
