import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteReviewThunk, getCurrReviewThunk } from "../../../store/review";
import { getOneBusinessThunk } from "../../../store/business";
import { getAllUsersThunk } from "../../../store/AllUsers";
import UpdateReviewForm from "../updateReview/updateReview";
import DeleteReviewForm from "../reviewDelete/deleteReview";
import { Modal } from "../../../context/Modal";
import editreviewbttn from "../../icons/edit-icon.png"
import deleteicon from "../../icons/delete-icon.png"
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


  // const createdAtObject = getAllReviewsArr.created_at
  //   const createdAtString = JSON.stringify(createdAtObject)
  //   const date = createdAtString.slice(5, 8)
  //   const month = createdAtString.slice(9, 12)
  //   const year = createdAtString.slice(13, 17)
  //   createdAtDate = `${month} ${date}, ${year}`
  
  // const deleteReview = (e, id) => {
  //   e.preventDefault();
  //   dispatch(deleteReviewThunk(id)).then(() =>
  //   dispatch(getOneBusinessThunk(businessId))
  //   );
  // };
  const localDate = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})

  useEffect(() => {
    dispatch(getCurrReviewThunk(businessId)).then(() => setIsLoaded(true));
  }, [dispatch, businessId, showReviewDelete,showUpdateReview]);

  // if theres no users profileImage, return a default image
  const defaultImage = "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/55737/grinning-face-with-big-eyes-emoji-clipart-xl.png";
  const defaultProfileImage = (image) => {
    return image === null ? defaultImage : image;
  };



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
                        <img  className="user-profile-image"src={users.profileImage || defaultProfileImage} alt="profile-image"/>
                        &nbsp; &nbsp; &nbsp; 
                        <div className="three-items-container">
                          <div className="reviews-get-firstName">{users.username}</div>
                        <div className="reviews-get-greyed-name"> Elite Grumbler</div>
                        <div className="stars-go-here">
                        
                        </div>
                        </div>
                        
                        </div>
                        
                        ): ""}
                      </>
                    );
                  })}
                  <div className="details-pagestars">
                  <span className=""> {review.avg_rating} (stars will go here soon)</span> &nbsp;<span className="reviewed-date">{new Date(review.created_at).toString().slice(4, 15)}</span>
                  </div>
                  <div className="details-page-reviews">{review.review} </div>
                  
                 <div className="both-review-bttns">
                  <div>
                    <button className="edit-review-bttns"
                    
                      onClick={() => {setShowUpdateReview(true); setNowReview(review) }}><img className="editreviewbttnicon" src={editreviewbttn} alt=""></img></button> &nbsp;
                      
                    {showUpdateReview && (
                     <Modal onClose={() => setShowUpdateReview(false)}>
                      <UpdateReviewForm
                        nowReview={nowReview}
                        setShowUpdateReview={setShowUpdateReview}
                      />
                     </Modal>
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
                    className="edit-review-bttns"
                    onClick={() => {
                      setNowReview(review);
                      setShowReviewDelete(true);
                    }}
                  >
                   {<img className="editreviewbttnicon" src={deleteicon} alt=""></img>}
                  </button></div>
                  
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
