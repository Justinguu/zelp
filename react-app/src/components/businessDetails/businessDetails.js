import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  getOneBusinessThunk,

} from "../../store/business";
import { getOneReviewThunk, createReviewThunk } from "../../store/review";
import { Modal } from "../../context/Modal";
import BusinessDelete from "../BusinessDelete/businessDelete";
import EditBusinessForm from "../BusinessEdit/businessEdit.js";
import "./businessDetails.css";

const BusinessDetails = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [disabled, setDisabled] = useState(true);

  const { businessId } = useParams();

  const user = useSelector((state) => state.session.user.id);
  const currBusiness = useSelector((state) => state.business[businessId]);
  // console.log(currBusiness);
  const allReviews = useSelector((state) => state.review);
  const getAllReviewsArr = Object.values(allReviews);
  //   console.log(allReviews)

  const history = useHistory();

  const sessionReview = !user
    ? null
    : getAllReviewsArr.find((review) => review.userId === user.id);
  useEffect(() => {
    setDisabled(!!sessionReview);
  });

  const dispatch = useDispatch();

  const addReview = (e, businessId) => {
    e.preventDefault();
    history.push(`/business/${businessId}/review`);
  };

  useEffect(() => {
    dispatch(getOneReviewThunk(businessId));
    dispatch(getOneBusinessThunk(businessId)).then(() => setIsLoaded(true));
  }, [dispatch, businessId]);

  if (currBusiness === undefined) {
    return <div>Business not found</div>; // if currBusiness is undefined, return this
  }
  //added
  if (isLoaded && currBusiness.owner_id === undefined) {
    dispatch(getOneBusinessThunk(businessId));
    return <div></div>;
  }

  //   const rating = currBusiness.rating == 0 ? "New" : currBusiness.rating;
  //show business reviews

  return (
    isLoaded && (
      <>
        {/* have a left side for half image detail & right with address and stuff */}
        <div className="whole-page-container">
          <div className="whole-page-wrapper">
            <div className="currSpot-header"></div>
            <div className="whole-details-container">
              <img
                className="img-currSpots"
                src={currBusiness.preview_image}
                alt="business image"
              />
              {/* {Number(rating).toFixed(2)}{" "} */}

              <div>
                <h2 className="currSpot-name">{currBusiness.business_name}</h2>
                <p className="price-text"> ${currBusiness.price}</p>
                {currBusiness.address} {currBusiness.city}, {currBusiness.state}
                ,{currBusiness.country} {currBusiness.zip}
                <p className="numReview-star">
                  {/* {Number(rating).toFixed(2)}{" "} {currBusiness.num_reviews} Reviews */}
                </p>
              </div>
            </div>

            {!user
              ? null
              : currBusiness.owner_id === user.id && (
                  <button
                    className="review-spot-button"
                    // disabled={disabled}
                    onClick={(e) => addReview(e, currBusiness.id)}
                  >
                    Review Business
                  </button>
                )}

            {/* {disabled && (
                <div className="review-text-disabled"> Thanks for leaving a review for this spot! </div>
            )} */}
            {/* if they are the business owner equals user.id*/}
            {currBusiness.ownerId === user?.id && (
              <div>
                <button
                  className="EditSpot-button"
                  onClick={() => setShowUpdate(true)}
                >
                  Edit Business{" "}
                </button>{" "}
                &nbsp;&nbsp;&nbsp;
                <button
                  className="DeleteSpot-button"
                  onClick={() => setShowDelete(true)}
                >
                  Delete Busineess
                </button>
                {showUpdate && (
                  <Modal onClose={() => setShowUpdate(false)}>
                    <EditBusinessForm
                      businessId={businessId}
                      setShowUpdate={setShowUpdate}
                    />
                  </Modal>
                )}
                {showDelete && (
                  <Modal onClose={() => setShowDelete(false)}>
                    <BusinessDelete
                      businessId={businessId}
                      setShowDelete={setShowDelete}
                    />
                  </Modal>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    )
  );
};

export default BusinessDetails;
