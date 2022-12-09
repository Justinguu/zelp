import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneBusinessThunk, getAllBusinessesThunk } from "../../store/business";
import { getAllReviewsThunk } from "../../store/review";
import { getAllImagesThunk } from "../../store/image";
import Bstar from "../icons/Bstar.jpg";
import checkmark from "../icons/checkmark.png";
import "./User.css";

function User() {
  const [user, setUser] = useState({});
  const [tab, setTab] = useState(1);
  const { userId, businessId } = useParams();
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

  useEffect(() => {
    dispatch(getAllImagesThunk());
  }, [dispatch]);

  // const allUsersArr = useSelector((state) => Object.values(state.allUsers));
  // console.log(allUsersArr)

  const sessionUser = useSelector((state) => state.session.user);

  const business = useSelector((state) => state.business);
  const allBusinessesArr = Object.values(business);

  const reviewsss = useSelector((state) => state.review);
  const allReviewsArr = Object.values(reviewsss);
  const flatReviewArr = allReviewsArr.flat();

  const allImage = useSelector((state) => state.image);
  const allImageArr = Object.values(allImage);

  
  const userBusinessesArr = allBusinessesArr.filter((business) => business.owner_id == sessionUser.id);
  const userReviewsArr = flatReviewArr.filter((review) => review.user_id === sessionUser.id);
 
  const userImagesArr = allImageArr.filter((image) => image.business_id === sessionUser.id);








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

  // const ratingIncrementer = (int) => {
  //   let forRatings = [];

  //   for (let num = 0; num < int; num++) {
  //     forRatings.push(<div class="fa-regular fa-star" style={{ color: "orange", margin: "0 5px" }}></div>);
  //   }

  //   for (let num = 0; num < 5 - int; num++) {
  //     forRatings.push(<div class="fa-regular fa-star" style={{ color: "lightgrey", margin: "0 .2rem" }}></div>);
  //   }

  //   return forRatings.map((ratings) => {
  //     return ratings;
  //   });
  // };

  // const thebusinessReviews = allReviewsArr.filter((review) => {
  //   return review.business_id === parseInt(businessId);
  // });

  // //  the average of thebusinessReviews avg_rating
  // const avgRating = thebusinessReviews.reduce((acc, review) => {
  //   return acc + review.avg_rating;
  // }, 0);
  // const avgRatingFinal = avgRating / thebusinessReviews.length;
  // const avgRatingFinalWhole = Math.round(avgRatingFinal);

  // // number of reviews per business
  // const numOfReviews = thebusinessReviews.length;

  return (
    <div className="user-container">
      <div className="user-wrapper">
        <span>
          <img src={user.profileImage} className="user-pfImage" alt="user profile" />
        </span>

        <div>
          <h1>Welcome {user.username} </h1>
        </div>

        <div className="user-emails"></div>
        {/* <div>
          <strong>Number Of Businesses Owned:</strong> &nbsp;{numBusinesses}
        </div> */}
        {/* <div className="user-businessList">{businessList}</div> */}

        {/* <div>
          <strong>Number Of Reviews:</strong>&nbsp;{numReviews}
        </div> */}
        <div className="business-bottom-container">
          <div className="user-profile-tabs-container">
            <div
              className={tab === 1 ? "user-tab-buttons active-tab-bg" : "user-tab-buttons"}
              onClick={() => setTab(1)}
            >
              Profile Overview
            </div>
            <div
              className={tab === 2 ? "user-tab-buttons active-tab-bg" : "user-tab-buttons"}
              onClick={() => setTab(2)}
            >
              My Businesses
            </div>

            <div
              className={tab === 3 ? "user-tab-buttons active-tab-bg" : "user-tab-buttons"}
              onClick={() => setTab(3)}
            >
              My Reviews
            </div>

            <div
              className={tab === 4 ? "user-tab-buttons active-tab-bg" : "user-tab-buttons"}
              onClick={() => setTab(4)}
            >
              My Photos
            </div>
          </div>
          <div className="display-curr-tab-info-container">
            {tab === 1 ? (
              <div className="user-profileOverTab">
                
                <div>
                <div>
                    <strong>First Name: </strong>
                    {sessionUser.firstName}{" "}
                  </div>
                  <div>
                    <strong>Last Name: </strong>
                    {sessionUser.lastName}{" "}
                  </div>
                  <strong>Username: </strong>
                  {sessionUser.username}{" "}
                  <div>
                    <strong>Email: </strong>
                    {sessionUser.email}{" "}
                  </div>
                  <div>
                  <strong>Account Created: </strong>
                  {new Date(sessionUser.createdAt).toString().slice(4, 15)}{" "}
                  </div>
                  <div>
                    <strong>Number Of Businesses Owned:</strong> &nbsp;{numBusinesses}
                  </div>
                  {/* <div className="user-businessList">{businessList}</div> */}
                  <div>
                    <strong>Number Of Reviews For Business:</strong>&nbsp;{numReviews}
                  </div>{" "}
                </div>
              </div>
            ) : (
              ""
            )}
            {tab === 2 ? (
              <div className="user-business-tab">
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
                            <img className="user-business-imagess" src={business.preview_image} alt="restraunt" />
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
            ) : (
              ""
            )}
            {tab === 3 ? (
              <div key={reviewsss.id}>
                <div className="userReviewsText">
                  <strong>Number Of Reviews:</strong>&nbsp;{numReviews}
                </div>
                <div>
                  {userReviewsArr.map((review) => {
                    // {
                    //   console.log(review);
                    // }
                    return (
                      <div className="all-reviews-container">
                        <div className="singleReviewContainer">
                          <div className="reviews-user-info">
                            <div className="review-business-name">
                              <strong>Rating :</strong> {review.avg_rating} <img className="Bstar" src={Bstar} alt="star" />
                            </div>
                            <div className="theUserReviews">
                              <strong>Review</strong>: {review.review}
                            </div>
                            <div>
                              <strong>Date Created</strong>: {new Date(review.created_at).toString().slice(4, 15)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>{" "}
              </div>
            ) : (
              ""
            )}

            {tab === 4 ? <div>
              <div className="userImagesText" u><strong>My Business Images </strong></div>
              <div className="user-business-images">{userImagesArr.map((image) => {
                return (
                  <div className="user-business-images-container">
                    
                    {/* <div className="user-image-business-num"><strong>From Business #</strong>{image.business_id}</div> */}
                
                    <img className="user-business-image"src={image.imageUrl} alt="restraunt" ></img>
                  
                  </div>
                )
              })} </div>

            </div> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
export default User;
