import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteReviewThunk, getOneReviewThunk } from "../../store/review";
import { getOneBusinessThunk } from "../../store/business";
import sessionUser from "../../store/session";

import "./reviewGet.css";

const GetBusinessReviews = ({ businessId }) => {
    
    const allReviews = useSelector((state) => state.review);
    const getAllReviewsArr = allReviews.filter((review) => review.businessId === parseInt(businessId));

    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);

    const dispatch = useDispatch();

    const deleteReview = (e, id) => { 
        e.preventDefault()
        dispatch(deleteReviewThunk(id)).then(() => dispatch(getOneReviewThunk(businessId)))
    }

    useEffect(() => {
        dispatch(getOneReviewThunk(businessId)).then(() => setIsLoaded(true));
    }, [dispatch, businessId]);

    //insert image of the user who wrote the review

    

    return (
        isLoaded && (
            <ul className="review-border">
                {Object.values(getAllReviewsArr).map((review) => {
                    return (
                        <div className="review-box" key={review.id}>
                            <div className='reviewe-box'
                            style={{ fontSize: "16px", fontWeight: "800px" }}>
                                <div>
                                    {sessionUser.profilePic}
                                    </div>{""} <div className="review-name">{review.User.firstName}

                                </div>
                                <div className="review-text">
                                    {review.review}
                                    {!sessionUser ? null : sessionUser.id === review.userId && (
                                    <button
                                    className="deleteButtonReview"
                                    onClick={(e) => deleteReview(e, review.id)}
                                    >
                                        DeleteReview
                                    </button>    
                )}
                            </div>
                        </div>
                        </div>
                    )
})}
            </ul>
        )
    )
}

