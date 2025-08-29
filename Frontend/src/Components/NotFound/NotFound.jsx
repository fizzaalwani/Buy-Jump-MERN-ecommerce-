import React from "react";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="notfound-content">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <a href="/" className="notfound-btn">Go Back Home</a>
      </div>
    </div>
  );
};

export default NotFound;
