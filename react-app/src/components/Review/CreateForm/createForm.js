import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createReviewThunk } from "../../../store/review";
import "./createReviewForm.css";

function CreateReviewForm({ setShowReview }) {
  const [isLoaded, setLoaded] = useState(false);

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

    if (review.length > 200) {
      errors.push("Review body must be no more than 200 characters");
    }
    if (review.length < 1) {
      errors.push("Review body must be more than 1 character");
    }

    if (rating.rating < 0 || rating.rating > 5) {
      errors.push("Rating must be between 0 and 5");
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
        <input
          className="descriptionCreateComment"
          placeholder="review..."
          type="text"
          autoComplete="off"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
        <div id="rating-stars">
          <div id="rating">Rating</div>
          <div class="star-wrapper">
            <a
              onClick={() => setRating(5)}
              value={rating}
              class="fas fa-star s1"
            ></a>
            <a
              onClick={() => setRating(4)}
              value={rating}
              class="fas fa-star s2"
            ></a>
            <a
              onClick={() => setRating(3)}
              value={rating}
              class="fas fa-star s3"
            ></a>
            <a
              onClick={() => setRating(2)}
              value={rating}
              class="fas fa-star s4"
            ></a>
            <a
              onClick={() => setRating(1)}
              value="5"
              class="fas fa-star s5"
            ></a>
          </div>
          <script src="https://kit.fontawesome.com/5ea815c1d0.js"></script>
          <div class="wraper">
            <script
              type="text/javascript"
              src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js"
              data-name="bmc-button"
              data-slug="gitlabBilal"
              data-color="#FFDD00"
              data-emoji=""
              data-font="Cookie"
              data-text="Buy me a coffee"
              data-outline-color="#000000"
              data-font-color="#000000"
              data-coffee-color="#ffffff"
            ></script>
          </div>
        </div>
        {/* <input
        className="ratingCreateComment"
        placeholder="rating..."
        type="number"

        autoComplete="off"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
        /> */}
        <div className="createCommentButton">
          <button className="submitCreateComment" type="submit">
            Submit new review
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateReviewForm;
