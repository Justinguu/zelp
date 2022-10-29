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
import star from '../icons/star.png'
import phone from '../icons/phone.png'
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

  function dashedNumber(value){
    const afterIndices = [3,6]; 
    const length = value.length;
    let newValue = '' 
    for(let i=0; i<length; i++){
      if(afterIndices.includes(i))
        newValue+='-'
      newValue+=value[i];
    }
    return newValue;
  }
  return (
    isLoaded && (
      <>
        {/* have a left side for half image detail & right with address and stuff */}
        <div className="whole-page-container">
          <img
            className="img-currSpots"
            src={currBusiness.preview_image}
            alt="business image"
          ></img>
          <div className="business-info-container">
            <div className="currSpot-name">{currBusiness.business_name}</div>
            <div className="details-price">Claimed ● ${currBusiness.price}</div>
            <div className="details-price"> {currBusiness.address} {currBusiness.city},{" "}
            {currBusiness.state},{currBusiness.country} {currBusiness.zip_code}</div> 
          </div>
          <div className="business-details-bottom-container">
            <div className="business-details-bottom-wrapper">
              <div className="business-details-left">
                <div>
                  <button
                    className="create-review-button"
                    onClick={() => setShowReview(true)}
                  >
                      <img className="star" src={star} alt="star"/>
                   &nbsp; Write A Review
                  </button>
                  {showReview && (
                    <Modal onClose={() => setShowReview(false)}>
                      <CreateReviewForm setShowReview={setShowReview} />
                    </Modal>
                  )}
                </div>
                <div>
                  <GetBusinessReviews
                    businessId={businessId}
                    sessionUser={user}
                  />
                </div>
              </div>
              <div className="business-details-right">
                {currBusiness.ownerId === user?.id && (
                  <div className="details-container">
                    <button
                      className="Editbiz-button"
                      onClick={() => setShowUpdate(true)}
                    >
                      Edit Business
                    </button>
                    <button
                      className="Deletebiz-button"
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
                      <div className="phoneNumberBox">
                      {dashedNumber(currBusiness.phone_number)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img className="phone" src={phone} alt="phone"/>
                      </div>

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
          </div>
        </div>
      </>
    )
  );
};

export default BusinessDetails;
