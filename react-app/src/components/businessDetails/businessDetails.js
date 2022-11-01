import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getOneBusinessThunk, getAllReviewsArr } from "../../store/business";
import { getCurrReviewThunk, createReviewThunk } from "../../store/review";
import { Modal } from "../../context/Modal";
import GetBusinessReviews from "../Review/ReviewGet/getReviews";
import CreateReviewForm from "../Review/CreateForm/createForm";
import BusinessDelete from "../BusinessDelete/businessDelete";
import EditBusinessForm from "../BusinessEdit/businessEdit.js";

import star from "../icons/star.png";
import phone from "../icons/phone.png";
import highlights from "../icons/highlights.png";
import email from "../icons/email.png";
import checkmark from "../icons/checkmark.png";
import "./businessDetails.css";

const BusinessDetails = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const [disable, setDisable] = useState(true);

  const { businessId, sessionUser } = useParams();

  const user = useSelector((state) => state.session.user);
  const currBusiness = useSelector((state) => state.business[businessId]);

  const allReviews = useSelector((state) => state.review);
  const getAllReviewsArr = Object.values(allReviews);

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrReviewThunk(businessId));
    dispatch(getOneBusinessThunk(businessId)).then(() => setIsLoaded(true));
  }, [dispatch, businessId]);

  // useEffect(() => {
  //   const checker = async () => {
  //   if (user) {
  //       if (user.id === currBusiness.owner_id) {
  //       setDisable(true)
  //     } else {
  //       setDisable(false);
  //     }
  //   }
  // };
  // checker();
  // }, []);

  if (currBusiness === undefined) {
    return <div>Business not found</div>; // if currBusiness is undefined, return this
  }

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
  function priceToDollar(price) {
    if (price <= 15) {
      return "$";
    } else if (price >= 16 && price <= 30) {
      return "$$";
    } else if (price >= 31) {
      return "$$$";
    }
  }
  const ratingIncrementer = (int) => {
    let forRatings = [];

    for (let num = 0; num < int; num++) {
      forRatings.push(
        <div
          class="fa-regular fa-star"
          style={{ color: "yellow", margin: "0 5px" }}
        ></div>
      );
    }

    for (let num = 0; num < 5 - int; num++) {
      forRatings.push(
        <div
          class="fa-regular fa-star"
          style={{ color: "grey", margin: "0 .2rem" }}
        ></div>
      );
    }

    return forRatings.map((ratings) => {
      return ratings;
    });
  };
  // shows the businesses reviews info for this details page
  const thebusinessReviews = getAllReviewsArr.filter((review) => {
    return review.business_id === parseInt(businessId);
  });

  //  the average of thebusinessReviews avg_rating
  const avgRating = thebusinessReviews.reduce((acc, review) => {
    return acc + review.avg_rating;
  }, 0);
  const avgRatingFinal = avgRating / thebusinessReviews.length;
  const avgRatingFinalWhole = Math.round(avgRatingFinal);

  // number of reviews per business
  const numOfReviews = thebusinessReviews.length;

  // const reviewButton = () => {

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
            <div className="total-review">
              {ratingIncrementer(avgRatingFinalWhole)} {numOfReviews} Reviews
            </div>
            <div className="price-claim">
              <img className="blue-checkmark" src={checkmark} alt="checkmark" />
              &nbsp;<div className="claimed">Claimed</div>
              <div className="details-price">
                {" "}
                ● {priceToDollar(currBusiness.price)}
              </div>
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

                  {user.id !== currBusiness.owner_id ? (
                    <button
                      className="create-review-button"
                      onClick={() => setShowReview(true)}
                    >
                      <img className="star" src={star} alt="star" />
                      &nbsp; Write A Review
                    </button>
                  ) : (
                    <button
                      className="create-review-button"
                      disabled={disable}
                    >
                      <img className="star" src={star} alt="star" />
                      &nbsp; Write A Review
                    </button>
                  )}
                  <div>

                    <img className="highlights" src={highlights} />
                  </div>
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
                {/* )} */}

                <div>
                  <GetBusinessReviews
                    businessId={businessId}
                    sessionUser={user}
                  />
                </div>
              </div>
              <div className="business-details-right">
                {currBusiness.owner_id === user.id && (
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

                <div className="phoneNumberBox">
                  {dashedNumber(currBusiness.phone_number)}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <img className="phone" src={phone} alt="phone" />
                </div>
                <div className="get-email">
                  <div className="email-info">{currBusiness.email} </div>
                  <img className="email-image" src={email} alt="email" />
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
