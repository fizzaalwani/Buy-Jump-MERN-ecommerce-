import React, { useState } from 'react';
import './DescriptionBox.css';

function DescriptionBox() {
  const [activeTab, setActiveTab] = useState("description");

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
          Reviews (122)
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
            <div className="review">
              <p className="review-user">John D.</p>
              <p className="review-text">Great quality! Fits perfectly and looks amazing.</p>
            </div>
            <div className="review">
              <p className="review-user">Sarah W.</p>
              <p className="review-text">Loved the material and the fit. Worth the price!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DescriptionBox;
