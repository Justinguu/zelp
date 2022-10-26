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
      <div>Hello World</div>
        <div className="whole-page-container">
          <div className="whole-page-wrapper">
            <div className="currSpot-header">
              <h2 className="currSpot-name">{currBusiness.business_name}</h2>
            </div>
            <div>
                <p>
                    {/* {Number(rating).toFixed(2)}{" "} */}
                    {currBusiness.city}, {currBusiness.state}, {currBusiness.zip}

                </p>

                <p className="price-text"> ${currBusiness.price}</p>
            </div>
          </div>
        </div>
      </>
    )
  );
};


export default BusinessDetails;