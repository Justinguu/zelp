import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createReviewThunk } from "../../../store/review";
import "./createReviewForm.css";

function CreateReviewForm({ setShowReview }) {
  const [isLoaded, setLoaded] = useState(false);

  const [clickReview, setClickReview] = useState(false);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

  const { businessId } = useParams();
  const dispatch = useDispatch();

  //add rating validation and add below
  useEffect(() => {
    const errors = [];

    if (review.length > 300) {
      errors.push("Review body must be no more than 300 characters");
    }
    if (review.length < 1) {
      errors.push("Review body must be more than 1 character");
    }

    if (rating.rating < 1 || rating.rating > 5) {
      errors.push("Rating must be between 1 and 5");
    }

    return setErrors(errors);
  }, [review, rating]);

  // useEffect(() => {
  //   dispatch(createReviewThunk(userId,businessId,review,rating)).then(()=> setLoaded(true))
  // })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length > 0) {
      return alert("Invalid Submission, Please Check Inputs");
    }
    dispatch(createReviewThunk(userId, businessId, review, rating));

    setShowReview(false);
  };

  return (
    <div className="CreateComment-outer">
      <form
        className="CreateComment-inner"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="errorHandlingContainer">
          {errors.length > 0 && (
            <div className="HeaderErrorStyling">
              <div className="UlBulletErrorStyling">
                {errors.map((error, idx) => (
                  <div className="ErrorPoints" key={idx}>
                    {error}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <h1 className="CreateCommentHeader">Create a Review</h1>

        <div className="combined-line-rating">
          <div className="text-rating">Select your rating</div>
          <div className="rating-stars">
            <div class="star-container">
              <div
                onClick={() => setRating(5)}
                value={rating}
                className={
                  rating >= 5 ? "fa-regular fa-star s5-checked " : "fa-regular fa-star s5"
                }
              ></div>
              <div
                onClick={() => setRating(4)}
                value={rating}
                className={
                  rating >= 4 ? "fa-regular fa-star s4-checked" : "fa-regular fa-star s4"
                }
              ></div>
              <div
                onClick={() => setRating(3)}
                value={rating}
                className={
                  rating >= 3 ? "fa-regular fa-star s3-checked" : "fa-regular fa-star s3"
                }
              ></div>
              <div
                onClick={() => setRating(2)}
                value={rating}
                className={
                  rating >= 2 ? "fa-regular fa-star s2-checked" : "fa-regular fa-star s2"
                }
              ></div>
              <div
                onClick={() => setRating(1)}
                value={rating}
                className={
                  rating >= 1 ? "fa-regular fa-star s1-checked" : "fa-regular fa-star s1"
                }
              ></div>
            </div>
            
      
          </div>
        </div>
        {
          <textarea
            className="descriptionCreateComment"
            placeholder="How was the business?"
            type="text"
            autoComplete="off"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />

          /* <input
        className="ratingCreateComment"
        placeholder="rating..."
        type="number"

        autoComplete="off"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
        /> */
        }
        <div className="createCommentButton">
          <button className="submitCreateComment" type="submit">
            Post Review
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateReviewForm;
