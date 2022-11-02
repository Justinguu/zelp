import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams, Redirect} from "react-router-dom";
import { updateReviewThunk } from "../../../store/review";
import "./updateReview.css"

function UpdateReviewForm({nowReview,setShowUpdateReview}){

    
const businessId = nowReview.business_id

const dispatch = useDispatch()

const sessionUser = useSelector(state => state.session.user)
const userId = sessionUser.id


const [review, setReview] = useState(nowReview.review)
const [rating, setRating] = useState(nowReview.avg_rating)
const [errors, setErrors] = useState([])
const [hasSubmitted, setHasSubmitted] = useState(false)

useEffect(() => {
    const errors = [];

    if (review.length > 300) {
        errors.push("Review body must be no more than 300 characters");
    }
    if (review.length < 1) {
        errors.push("Review body must be more than 1 character");
    }
    if (rating < 1 ||rating > 5){
        errors.push("Rating must be between 1 and 5")
      }
    return setErrors(errors);
}, [review,rating])



const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true)

    if(errors.length > 0){
      return alert("Invalid Submission, Please Check Inputs")
    }

    dispatch(updateReviewThunk(nowReview.id,userId,businessId,review,rating))
    setShowUpdateReview(false)

}

return (
    
    <form className="edit-form-update" onSubmit={handleSubmit}> 
    <h2>Edit Review Form</h2>
<div>
</div>
{errors.length > 0 && (
    <ul className="edit-review-errors">
        {errors.map((error, idx) => (
            <div className="edit-review-errors" key={idx}>{error}</div>
        ))}
    
    </ul>
    )}
    <div className="edit-form-container-review">
        <input
            className="edit-review-input"
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Rating"
            />
        <input
            className="edit-review-input2"
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Review"
            />
            <div className="">
                <button onClick={handleSubmit}className="submit-button-edit-review" type="button" >Update Review</button>
                
            </div>
            </div>

</form> 
)
}
export default UpdateReviewForm