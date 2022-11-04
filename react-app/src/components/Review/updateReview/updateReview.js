import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { updateReviewThunk } from "../../../store/review";
import "./updateReview.css";

function UpdateReviewForm({ nowReview, setShowUpdateReview }) {
  const businessId = nowReview.business_id;

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

  const [review, setReview] = useState(nowReview.review);
  const [rating, setRating] = useState(nowReview.avg_rating);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];

    if (review.length > 300) {
      errors.push("Review body must be no more than 300 characters");
    }
    if (review.length < 1) {
      errors.push("Review body must be more than 1 character");
    }
    if (rating < 1 || rating > 5) {
      errors.push("Rating must be between 1 and 5");
    }
    return setErrors(errors);
  }, [review, rating]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (errors.length > 0) {
      return alert("Invalid Submission, Please Check Inputs");
    }

    dispatch(
      updateReviewThunk(nowReview.id, userId, businessId, review, rating)
    );
    setShowUpdateReview(false);
  };

  return (
    <div className="CreateComment-outer">
      <form className="CreateComment-outer" onSubmit={handleSubmit}>
        <div className="errorHandlingCOntainer">
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
        <h1 className="CreateCommentHeader">Edit Your Review</h1>
        <div className="combined-line-rating">
          <div className="text-rating-edit">Select your rating</div>
          <div className="rating-stars">
            <div class="star-container">
              <div
                onClick={() => setRating(5)}
                value={rating}
                className={
                  rating >= 5
                    ? "fa-regular fa-star s5-checked "
                    : "fa-regular fa-star s5"
                }
              ></div>
              <div
                onClick={() => setRating(4)}
                value={rating}
                className={
                  rating >= 4
                    ? "fa-regular fa-star s4-checked"
                    : "fa-regular fa-star s4"
                }
              ></div>
              <div
                onClick={() => setRating(3)}
                value={rating}
                className={
                  rating >= 3
                    ? "fa-regular fa-star s3-checked"
                    : "fa-regular fa-star s3"
                }
              ></div>
              <div
                onClick={() => setRating(2)}
                value={rating}
                className={
                  rating >= 2
                    ? "fa-regular fa-star s2-checked"
                    : "fa-regular fa-star s2"
                }
              ></div>
              <div
                onClick={() => setRating(1)}
                value={rating}
                className={
                  rating >= 1
                    ? "fa-regular fa-star s1-checked"
                    : "fa-regular fa-star s1"
                }
                ></div>
            </div>
          </div>
                </div>
          <textarea
            className="descriptionCreateComment"
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Review"
          />
          <div className="createCommentButton">
            <button
              onClick={handleSubmit}
              className="submitEditComment"
              type="button"
            >
              Update Review
            </button>
          </div>
      </form>
    </div>
  );
}
export default UpdateReviewForm;
