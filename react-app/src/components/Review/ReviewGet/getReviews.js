import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteReviewThunk, getCurrReviewThunk } from "../../../store/review";
import { getOneBusinessThunk } from "../../../store/business";
import { getAllUsersThunk } from "../../../store/AllUsers";
import "./reviewGet.css";

const GetBusinessReviews = ({ businessId }) => {
  const allReviews = useSelector((state) => state.review.reviews);
  const getAllReviewsArr = Object.values(allReviews);


  console.log(getAllReviewsArr)
//   const allUsers = useSelector((state) => state.users);
//   const allUsersArr = Object.values(allUsers);

  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();

  // const deleteReview = (e, id) => {
  //     e.preventDefault()
  //     dispatch(deleteReviewThunk(id)).then(() => dispatch(getOneReviewThunk(businessId)))
  // }
//   useEffect(() => {
//     dispatch(getAllUsersThunk());
//   }, [dispatch]);

  useEffect(() => {
    dispatch(getCurrReviewThunk(businessId)).then(() => setIsLoaded(true));
  }, [dispatch, businessId]);

  return (
    isLoaded && (
      <ul className="review-border">
        {getAllReviewsArr.map((review) => {
          return (
            <div className="review-box" key={review.id}>
            {review.review}
            {review.avg_rating}
        
            </div>
          );
        })}
      </ul>
    )
  );
};

export default GetBusinessReviews;
