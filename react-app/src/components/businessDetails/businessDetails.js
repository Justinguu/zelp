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
import star from "../icons/star.png";
import phone from "../icons/phone.png";
import highlights from "../icons/highlights.png";
import email from "../icons/email.png";
import checkmark from "../icons/checkmark.png"
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

  function dashedNumber(number) {
    const numWithoutDashes = number.replace(/[^0-9]/g, "");
    if (numWithoutDashes.length > 10) return number.slice(0, -1);
    const dashPlaces = [3, 6];
    return numWithoutDashes
      .split("")
      .reduce(
        (acc, curr, i) =>
          dashPlaces.includes(i) ? [...acc, "-", curr] : [...acc, curr],
        []
      )
      .join("");
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
            <div className="price-claim">
              <img className="blue-checkmark" src={checkmark} alt="checkmark"/>
               &nbsp;<div className="claimed">Claimed</div>
            <div className="details-price"> ● ${currBusiness.price}</div>
            </div>
           
            <div className="details-price">
              {" "}
              {currBusiness.address} {currBusiness.city}, {currBusiness.state},
              {currBusiness.country} {currBusiness.zip_code}
            </div>
          </div>
          <div className="business-details-bottom-container">
            <div className="business-details-bottom-wrapper">
              <div className="business-details-left">
                <div>
                  <button
                    className="create-review-button"
                    onClick={() => setShowReview(true)}
                  >
                    <img className="star" src={star} alt="star" />
                    &nbsp; Write A Review
                  </button>
                  <div>
                    <img className="highlights" src={highlights} />
                  </div>
                  {/* <div> About the Business </div> */}
                  <div className="blue-review-box">
                    <div className="blue-box-bold-text">
                      Your trust is our top concern,
                    </div>{" "}
                    so businesses can't pay to alter or remove their reviews.
                  </div>
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
                      {dashedNumber(currBusiness.phone_number)}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <img className="phone" src={phone} alt="phone" />
                    </div>
                    <div className="get-email">
                      {currBusiness.email} 
                      <img className="email-image" src={email} alt="email"/>
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
