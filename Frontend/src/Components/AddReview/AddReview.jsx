import React, { useRef, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import axios from 'axios';
import './AddReview.css'

const AddReview = ({id}) => {
  const [hover,setHover]=useState(null)
  const [rating,setRating]=useState(null)
  const [message,setMessage]=useState('')
  const [error,setError]=useState('')
  const [submitting,setSubmitting]=useState(false) //debouncing
  const reviewRef=useRef(null)
  const [reviewData,setReviewData]=useState({
    name:'',
    email:'',
    rating:0,
    review:'',
    productId:id
  })
  const handleChange=(e)=>{
    setReviewData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(submitting) return 
    let payload={...reviewData,rating}
     console.log(payload)
    try{
     setSubmitting(true)
     let response=await axios.post('http://localhost:4000/review/add',payload)
     if(response.data.success){
     setMessage("Your review will be posted after being verified by the admin")
     }else{
      setError(response.data.message)
      console.log(response.data.message)
     }
       setReviewData({
          name: '',
          email: '',
          rating: 0,
          review: '',
          productId: id
        })
        setRating(0)
        setHover(null)
    }catch(err){
      setError("Something went wrong .Please Try again later")
      console.log(err.message || err.response.data.message)
    }finally{
      setSubmitting(false)
    }
  }
  const handleShowReview=(e)=>{
    if(reviewRef.current){
      if(reviewRef.current.style.display==="none" || reviewRef.current.style.display===""){
        reviewRef.current.style.display="flex"
      }else{
        reviewRef.current.style.display="none"
      }
    }
  }

  return (
    <div className='add-review'>
     <button className='add' onClick={(e)=>handleShowReview(e)}>Add Review</button>
     <div className="form" ref={reviewRef} style={{display:"flex"}}>
         <form action="" onSubmit={handleSubmit}>
        <div className="name flex-col">
            <label htmlFor="">Name</label>
            <input type="text" placeholder='write your name'
            name='name' value={reviewData.name}
            onChange={handleChange}/>
        </div>
        <div className="email flex-col">
            <label htmlFor="">Email</label>
            <input type="email"  id="" required placeholder='Enter your Email'
            name='email' value={reviewData.email}
             onChange={handleChange}/>
        </div>
        <div className="rating ">
          <label htmlFor="">Rating :</label>
         {[1,2,3,4,5].map((value) => {
          const filled = value <= (hover || rating)
          const Icon = filled ? FaStar : FaRegStar
          return (
          
          <div key={value} style={{display:"flex"}}>
            <Icon
              className={`star ${filled ? 'star-filled' : ''}`}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(value)}
            />
          </div>  
          )
        })}
        </div>
        <div className="review flex-col">
            <label htmlFor="">Review</label>
           <textarea id="" cols={30} placeholder='Write your review'
           name='review' value={reviewData.review}
            onChange={handleChange} ></textarea>
        </div>
        {error && <div style={{color:"red",fontSize:"14px"}}>{error}</div>}
        <button className='submit' disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
     </form>
     </div>
     {message && <div style={{color:"green",fontSize:"16px"}}>{message}</div>}
    
    </div>

  )
}

export default AddReview
