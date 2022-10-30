import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams, Redirect} from "react-router-dom";
import { updateReviewThunk } from "../../../store/review";

function UpdateReviewForm({nowReview,setShowUpdateReview}){

    
const businessId = nowReview.business_id

const dispatch = useDispatch()

const sessionUser = useSelector(state => state.session.user)
const userId = sessionUser.id






const [review, setReview] = useState(nowReview.review)
const [rating, setRating] = useState(nowReview.rating)
const [errors, setErrors] = useState([])
const [hasSubmitted, setHasSubmitted] = useState(false)

useEffect(() => {
    const errors = [];

    if (review.length > 200) {
        errors.push("Review body must be no more than 200 characters");
    }
    if (review.length < 1) {
        errors.push("Review body must be more than 1 character");
    }
    if (rating < 0 ||rating > 5){
        errors.push("Rating must be between 0 and 5")
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
    
<form onSubmit={handleSubmit}className="spot-form-update"> 
<div>
    <h3>Edit Review Form</h3>
</div>
{hasSubmitted && errors.length > 0 && (
    <ul className="edit-errors">
        {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
        ))}
    
    </ul>
    )}
    <div className="edit-form-container">
        <input
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Review"
            />
        <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Rating"
            />
            <div>
                <button type="submit-button-edit">Update Review</button>
            </div>
            </div>

</form> 
)
}
export default UpdateReviewForm