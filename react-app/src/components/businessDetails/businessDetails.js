import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getOneBusinessThunk, getAllBusinessesThunk } from "../../store/business";
import { getOneReviewThunk } from "../../store/review";
import { Modal } from "../../context/Modal";
import "./businessDetails.css";

const BusinessDetails = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [setReviews] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { businessId } = useParams();


  const user = useSelector((state) => state.session.user.id); // console log user and curbussiness later
  const currBusiness = useSelector((state) => state.business[businessId]);
//   console.log(currBusiness)
//   const allReviews = useSelector((state) => state.review);
//   const getAllReviewsArr = Object.values(allReviews);
//   console.log(allReviews)

  const history = useHistory();

//   const sessionReview = !user
//     ? null
//     : getAllReviewsArr.find((review) => review.user.id === user.id);
//   useEffect(() => {
//     setDisabled(!!sessionReview);
//   });

  const addReview = (e) => {
    e.preventDefault();
    history.push(`/business/${businessId}/review`);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneBusinessThunk(businessId)).then(() => setIsLoaded(true));
  }, [dispatch, businessId]);

  if (!isLoaded) {
    return <div></div>; // if not loaded, wait for it to load.. very short
  }

  if (currBusiness === undefined) {
    return <div>Business not found</div>; // if currBusiness is undefined, return this
  }

//   if (isLoaded && currBusiness.owner_id === undefined) {
    
//     dispatch(getOneBusinessThunk(businessId));
//     return <div></div>;
//   }
  console.log(currBusiness)
//   const rating = currBusiness.rating == 0 ? "New" : currBusiness.rating;
//show business reviews

  return (
    isLoaded && (
      <>
      
        <div className="whole-page-container">
          <div className="whole-page-wrapper">
            <div className="currSpot-header">
              <h2 className="currSpot-name">{currBusiness.business_name}</h2>
            </div>
            <div>
                <p>
                    {/* {Number(rating).toFixed(2)}{" "} */}
                   {currBusiness.address} {currBusiness.city}, {currBusiness.state},{currBusiness.country} {currBusiness.zip}
                </p>
                <p className="price-text"> ${currBusiness.price}</p>
                <img className="img-currSpots"
                src={currBusiness.preview_image} alt="business image" />
                <p className="numReview-star" >
                    {/* {Number(rating).toFixed(2)}{" "} {currBusiness.num_reviews} Reviews */}
                </p>
            </div>
            {/* if not user or null or if currbusiness owner === a user*/}
            {!user ? null : currBusiness.owner_id === user?.id && (
                <button
                className="review-spot-button"
                disabled={disabled}
                onClick={(e) => addReview(e, currBusiness.id)}
                >
                    Review Business
                </button>
            )}
            {/* {disabled && (
                <div className="review-text-disabled"> Thanks for leaving a review for this spot! </div>
            )} */}
                  {/* if they are the business owner equals user.id*/}
            {currBusiness.owner_id === user?.id && (
                <div>
                    <button
                    className="EditSpot-button"
                    onClick={() => setShowUpdate(true)}
                    >
                        Review Business
                    </button>
                </div>
                )}
                
          </div>
        </div>
      </>
    )
  );
};


export default BusinessDetails;