import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getOneBusinessThunk } from "../../store/business";
import { getCurrReviewThunk, createReviewThunk } from "../../store/review";
import { Modal } from "../../context/Modal";
import GetBusinessReviews from "../Review/ReviewGet/getReviews";
import CreateReviewForm from "../Review/CreateForm/createForm";
import BusinessDelete from "../BusinessDelete/businessDelete";
import DeleteReviewForm from "../Review/reviewDelete/deleteReview";
import EditBusinessForm from "../BusinessEdit/businessEdit.js";
import "./businessDetails.css";

const BusinessDetails = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const [disabled, setDisabled] = useState(true);

  const { businessId } = useParams();

  const user = useSelector((state) => state.session.user.id);
  const currBusiness = useSelector((state) => state.business[businessId]);
  // console.log(currBusiness);
  const allReviews = useSelector((state) => state.review);
  const getAllReviewsArr = Object.values(allReviews);
  // console.log(allReviews)

  const history = useHistory();

  const sessionReview = !user
    ? null
    : getAllReviewsArr.find((review) => review.userId === user.id);
  useEffect(() => {
    setDisabled(!!sessionReview);
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrReviewThunk(businessId));
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
              <img
                className="img-currSpots"
                src={currBusiness.preview_image}
                alt="business image"
              ></img>
              <div className="business-info-container"></div>
              <div className="business-info-wrapper">
            <div className="business-bottom-half">
              <div>
                <button
                  className="create-review-button"
                  onClick={() => setShowReview(true)}
                >
                  Create Review
                </button>
                {showReview && (
                  <Modal onClose={() => setShowReview(false)}>
                    <CreateReviewForm setShowReview={setShowReview} />
                  </Modal>
                )}
              </div>
                <div className="business-information-container">


                  <div className="currSpot-name">
                    {currBusiness.business_name}
                  </div>
                  <div></div>
                  <div>Claimed ● ${currBusiness.price}</div>
                  <div> {currBusiness.address} </div> {currBusiness.city},{" "}
                  {currBusiness.state},{currBusiness.country}{" "}
                  {currBusiness.zip_code}
                </div>
              

            <div>
              <p className="numReview-star">
                {/* {Number(rating).toFixed(2)}{" "} {currBusiness.num_reviews} Reviews */}
              </p>
            </div>
            <div className="currSpot-header"></div>
            <div className="whole-details-container">
                    <div className="detailss-container">
              {/* {Number(rating).toFixed(2)}{" "} */}
            </div>

            {currBusiness.ownerId === user?.id && (
              <div className="details-container">
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
                <div>
                  <GetBusinessReviews
                    businessId={businessId}
                    sessionUser={user}
                    />
                </div>
              </div>
            )}
          </div>
            </div>
            </div>
        </div>
            </div>
      </>
    )
  );
};

export default BusinessDetails;
