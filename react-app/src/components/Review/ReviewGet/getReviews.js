import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteReviewThunk, getCurrReviewThunk } from "../../../store/review";
import { getOneBusinessThunk } from "../../../store/business";
import { getAllUsersThunk } from "../../../store/AllUsers";
import UpdateReviewForm from "../updateReview/updateReview";
import DeleteReviewForm from "../reviewDelete/deleteReview";
import { Modal } from "../../../context/Modal";
import "./reviewGet.css";

const GetBusinessReviews = ({ businessId }) => {
  const getAllReviewsArr = useSelector((state) => Object.values(state.review));
  
  const sessionUser = useSelector((state) => state.session.user);

  // console.log(getAllReviewsArr)
  //   const allUsers = useSelector((state) => state.users);
  //   const allUsersArr = Object.values(allUsers);
  const [showUpdateReview, setShowUpdateReview] = useState(false);
  const [nowReview, setNowReview] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currReview, setCurrReview] = useState(false)
  const [showReviewDelete, setShowReviewDelete] = useState(false)

  const dispatch = useDispatch();

  const deleteReview = (e, id) => {
      e.preventDefault()
      dispatch(deleteReviewThunk(id)).then(() => dispatch(getOneBusinessThunk(businessId)))
  }


  useEffect(() => {
    dispatch(getCurrReviewThunk(businessId)).then(() => setIsLoaded(true));
  }, [dispatch, businessId,showReviewDelete]);

  return (
    isLoaded && (
      <ul className="review-border">
        {getAllReviewsArr.map((review) => {
          return ( 
            <>
             {businessId == review.business_id ? ( 
            
            
            <div className="review-box" key={review.id}>
              {review.review}
              {review.avg_rating}
              <div>
                <button
                  onClick={() => {
                    {
                      setShowUpdateReview(true);
                    }
                    setNowReview(review);
                  }}
                >
                  Edit Review
                </button>
                {showUpdateReview && (
                  <UpdateReviewForm
                    nowReview={nowReview}
                    setShowUpdateReview={setShowUpdateReview}
                  />
                )}
              </div>
              {showReviewDelete && (
                      <Modal onClose={() => setShowReviewDelete(false)}>
                        <DeleteReviewForm
                          businessId={businessId}
                          reviewId={nowReview.id}
                          setShowReviewDelete={setShowReviewDelete}/>


                      </Modal>
                    )}
              <button className="deleteButtonReview"
              onClick={() => {setNowReview(review); setShowReviewDelete(true)}}
              >
                Delete Review
              </button>
            </div>
            ): ""}
            </>
          );
        })}
      </ul>
    )
  );
};

export default GetBusinessReviews;
