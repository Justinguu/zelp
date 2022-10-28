import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk } from "../../store/review";


function CreateReviewForm({userId, imageId}) {
    const dispatch = useDispatch();

    const [review, setReview] = useState("")
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        const formValidationErrors = []

        if (review.length > 200) {
            formValidationErrors.push("Review body must be no more than 200 characters");
        }
        if (review.length < 1) {
            formValidationErrors.push("Review body must be more than 1 character");
        }

        setErrors(formValidationErrors);

    }, [comment]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (errors.length <= 0) {
            return dispatch(
              createACommentThunk(userId, imageId, comment )
            ).catch(async (res) => {
              const data = await res.json();
              if (data && data.errors) setErrors(data.errors);
            });
    }
    return errors;
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
              <ul className="UlBulletErrorStyling">
                {errors.map((error, idx) => (
                  <li className="ErrorPoints" key={idx}>
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <h1 className="CreateCommentHeader">Create a Review</h1>
        <input
        className="descriptionCreateComment"
        placeholder="review..."
        type="text"
        autoComplete="off"
        value={comment}
        onChange={(e) => setReview(e.target.value)}
        required
        />
        <div className="createCommentButton">
            <button className="submitCreateComment" type="submit">
                Submit new review
            </button>
        </div>
      </form>
    </div>
)


}

export default CreateReviewForm