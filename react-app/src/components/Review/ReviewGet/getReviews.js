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
  const [currReview, setCurrReview] = useState(false);
  const allUsers = useSelector((state) => state.allUsers);
  const [showReviewDelete, setShowReviewDelete] = useState(false);

  const dispatch = useDispatch();

  
  const allUsersArr = Object.values(allUsers);
  
  const deleteReview = (e, id) => {
    e.preventDefault();
    dispatch(deleteReviewThunk(id)).then(() =>
    dispatch(getOneBusinessThunk(businessId))
    );
  };
  const localDate = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})

  useEffect(() => {
    dispatch(getCurrReviewThunk(businessId)).then(() => setIsLoaded(true));
  }, [dispatch, businessId, showReviewDelete]);

  return (
    isLoaded && (
      <div className="review-border">
        {getAllReviewsArr.map((review) => {
          return (
            <>
              {businessId == review.business_id ? (
                <div className="review-box" key={review.id}>
                  {allUsersArr.map((users) => {
                    return (
                      <>
                        {review.user_id === users.id ? (
                          <div className="users-review-info">
                        <img  className="user-profile-image"src={users.profileImage} alt="profile-image"/>
                        &nbsp; &nbsp; &nbsp; 
                        <div className="three-items-container">
                          <div className="reviews-get-firstName">{users.username}</div>
                        <div className="reviews-get-greyed-name"> Elite Grumbler</div>
                        <div className="stars-go-here">
                         555555 {new Date(review.created_at).toString().slice(4, 15)}
                        </div>
                        </div>
                        
                        </div>
                        
                        ): ""}
                      </>
                    );
                  })}
                  {review.review}
                  {review.avg_rating}
                  <div>
                    <button
                      className="deleteButtonReview"
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
                        setShowReviewDelete={setShowReviewDelete}
                      />
                    </Modal>
                  )}
                  <button
                    className="deleteButtonReview"
                    onClick={() => {
                      setNowReview(review);
                      setShowReviewDelete(true);
                    }}
                  >
                    Delete Review
                  </button>
                </div>
              ) : (
                ""
              )}
            </>
          );
        })}
      </div>
    )
  );
};

export default GetBusinessReviews;
