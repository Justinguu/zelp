import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneBusinessThunk, getAllBusinessesThunk } from "../../store/business";
import { getAllReviewsThunk } from "../../store/review";
import checkmark from "../icons/checkmark.png";
import "./User.css";

function User() {
  const [user, setUser] = useState({});
  const { userId, businessId, owner_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneBusinessThunk(businessId));
  }, [dispatch, businessId]);

  useEffect(() => {
    dispatch(getAllBusinessesThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllReviewsThunk());
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);

  const business = useSelector((state) => state.business);
  const allBusinessesArr = Object.values(business);

  const currBusiness = useSelector((state) => state.business[businessId]);
  const reviews = useSelector((state) => state.review);
  const allReviewsArr = Object.values(reviews);

  const userBusinessesArr = allBusinessesArr.filter((business) => business.owner_id == sessionUser.id);
  const userReviewsArr = allReviewsArr.filter((review) => review.userId == userId);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  let numBusinesses = 0;
  if (user.businesses) {
    numBusinesses = user.businesses.length;
  }

  let numReviews = 0;
  if (user.reviews) {
    numReviews = user.reviews.length;
  }

  let businessList = [];
  if (user.businesses) {
    businessList = user.businesses.map((business) => (
      <div key={business.id}>
        <a href={`/businesses/${business.id}`}>{business.business_name}</a>
      </div>
    ));
  }

  const ratingIncrementer = (int) => {
    let forRatings = [];

    for (let num = 0; num < int; num++) {
      forRatings.push(<div class="fa-regular fa-star" style={{ color: "orange", margin: "0 5px" }}></div>);
    }

    for (let num = 0; num < 5 - int; num++) {
      forRatings.push(<div class="fa-regular fa-star" style={{ color: "lightgrey", margin: "0 .2rem" }}></div>);
    }

    return forRatings.map((ratings) => {
      return ratings;
    });
  };

  const thebusinessReviews = allReviewsArr.filter((review) => {
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
  // let reviewList = [];
  // if (user.reviews) {
  //   reviewList = user.reviews.map((review) => (
  //     <div key={review.id}>
  //       <a href={`/businesses/${review.businessId}`}>{review.review}</a>
  //     </div>
  //   ));
  // }

  return (
    <div className="user-container">
      <div className="user-wrapper">
        <span>
          <img src={user.profileImage} className="user-pfImage" alt="user profile" />
        </span>

         <div><h1>Welcome {user.username} </h1></div> 

        <div className="user-emails"></div>
        <div>
          <strong>Number Of Businesses Owned:</strong> &nbsp;{numBusinesses}
        </div>
        {/* <div className="user-businessList">{businessList}</div> */}

        <div>
          <strong>Number Of Reviews:</strong>&nbsp;{numReviews}
        </div>
        <div className="business-bottom-container">
          <div className="single-rest-container-left">
            {userBusinessesArr.map((business) => {
              return (
                <div className="all-restraunts-container" key={business.id}>
                  <div className="">
                    <div className="singleUserBusinessContainer">
                      <NavLink to={`/businesses/${business.id}`}>
                      <div className="currSpot-name">{business.business_name}</div>{" "}
                      <div className="price-claim">
                        <img className="blue-checkmark" src={checkmark} alt="checkmark" />
                        &nbsp;<div className="claimed">Claimed</div>
                      </div>
                        <img className="user-business-image" src={business.preview_image} alt="restraunt" />
                      </NavLink>
                      <div className="user-business-info">
                        <div>
                          {" "}
                          <strong>Business Email =</strong> {user.email}
                        </div>
                        <div>
                          <strong>Business Address = </strong> {business.address} {business.city}, {business.state},
                          {business.country} {business.zip_code}
                        </div>
                        <div>
                          <strong>Business Price =</strong> {business.price}{" "}
                        </div>
                        <div>
                          <strong>Business Category = </strong>
                          {business.category}
                        </div>
                        <div>
                          <strong>Business Description = </strong>
                          {business.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default User;
