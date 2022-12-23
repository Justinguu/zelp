import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, useParams, Redirect } from "react-router-dom";
import { getAllBusinessesThunk } from "../../store/business";
import { getAllUsersThunk } from "../../store/AllUsers";
import GetCategories from "../categories/GetCategories";
import zelpLogo from "../icons/klickr-logo-title.png"
import img1 from "../icons/image1.avif";
import img2 from "../icons/image2.avif";
import img3 from "../icons/image3.avif";
import img4 from "../icons/image4.avif";
import img5 from "../icons/image5.avif";
import options from "../icons/options.png";
import commentbox from "../icons/commentbox.png";
import githubIcon from "../icons/githubIcon.png";
import linkedIn from "../icons/linkedIn.png";
import brokenImage from "../icons/brokenImage.png";
import phone from "../icons/phone.png";
import "./HomePage.css";

const GetAllTheBusinesses = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const [submitted, setSubmitted] = useState(false);

  const business = useSelector((state) => state.business);
  const allBusinessesArr = Object.values(business);
  const allusers = useSelector((state) => state.allUsers);
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) {
    <Redirect to="/login"></Redirect>;
  }

  // let allbusinessesArray;
  let allUsersArray;

  const slideShowPic = [img1, img2, img3, img4, img5];
  const [pictures, setPictures] = useState(slideShowPic[0]);
  const [counter, setCounter] = useState(0);

  const [filterPrice, setFilterPrice] = useState("allResultsPrice");
  const [filterType, setFilterType] = useState("allResultsType");

  let typeBusinessesArr;

  let priceBusinessesArr;

  if (filterType !== "allResultsType") {
    typeBusinessesArr = allBusinessesArr.filter((business) => business.category == filterType);
  } else {
    typeBusinessesArr = allBusinessesArr;
  }

  if (filterPrice !== "allResultsPrice") {
    priceBusinessesArr = typeBusinessesArr?.filter((business) => business.price == filterPrice);
  } else {
    priceBusinessesArr = typeBusinessesArr;
  }

  useEffect(() => {
    setPictures(slideShowPic[counter]);
  }, [counter]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((counter) => (counter === 4 ? 0 : counter + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(getAllBusinessesThunk());
  }, [dispatch, allUsersArray, submitted]);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch, allUsersArray]);

  if (!sessionUser) {
    return (
      <div className="homepage-container">
        <div>
          {/* <div className="create-business-quote">Can't Decide What To Eat? Sign Up With Zelp & Let Us Help You </div> */}
          <img className="-nlg-hp-slideShowPic" alt="slideShow" src={pictures} />
        </div>

        <div className="best-resturants-text"></div>
        <div className="business-container">
          {/* <div className="about-details">Welcome Food Lovers! Quickly Scope Out Where to Eat </div> */}
          <div className="hp-header-ngl"> Recently Added Businesses</div>
          <div className="nlg-business-wrapper">
            {allBusinessesArr
              .sort((a, b) => b.id - a.id)
              .slice(0, 4)
              .map((business) => {
                return (
                  <>
                    <div className="oneBusinessContainer" key={business.id}>
                      <div className="main-left-side-container">
                        <NavLink to={`/businesses/${business.id}`}>
                          <img
                            className="single-image"
                            src={business.preview_image}
                            alt={brokenImage}
                            onError={(e) => {
                              e.currentTarget.src = brokenImage;
                            }}
                          ></img>
                        </NavLink>
                      </div>
                      <div className="main-right-side-container">
                        <NavLink to={`/businesses/${business.id}`}>
                          <div className="business-name-caption">{business.business_name}</div>
                        </NavLink>
                        <div className="business-captions">
                          {" "}
                          {business.city}, {business.state}
                        </div>
                        <div className="detailsAndComment">
                          <img className="" src={phone} alt="phone" /> {business.phone_number}
                        </div>
                        <div>
                          <img className="home-takeout-pic" src={options} />
                        </div>
                        {/* <div className="business-captions">Average Cost = ${business.price}.00</div> */}
                        {/* <div className="business-captions">{business.description}</div> */}
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
          {/* <GetCategories /> */}
        </div>
        <footer className="parentFooter">
          <div class="footer-home">
            <img className="ourRepo" src={githubIcon} alt="ourRepo" />
            <div className="footer-home-wrap-containers">
              <a className="text-for-github" href="https://github.com/Justinguu/zelp">
                {" "}
                https://github.com/Justinguu/zelp
              </a>
              &nbsp; &nbsp; &nbsp;
              <img className="linkedin" src={linkedIn} alt="linkedin"></img>
              <a className="text-for-github" href="https://www.linkedin.com/in/jung-gu-b69b98154/">
                {" "}
                https://www.linkedin.com/in/jung-gu-b69b98154/
              </a>
              &nbsp; &nbsp; &nbsp;Copyright 2022. All Rights Reserved.
            </div>
          </div>
        </footer>
      </div>
    );
  }
  if (sessionUser) {
    return (
      <div className="homepage-container">
        <img className="hp-slideShowPic" alt="slideShow" src={pictures} />
        <div className="business-container">
          <div className="detailsAndHeader">
          <div className="hp-header"> Zelp To A Resturant</div>
              <div className="about-details">Welcome Food Lovers! Quickly Scope Out Where to Eat </div>
          </div>
        
          <div className="business-wrapper">
            <div className="filter-container">
              <div className="filter-header">Filters</div>
              <div
                className={
                  filterPrice === "allResultsPrice" ? "clear-filter-buttons-inactive" : "clear-filter-buttons-active"
                }
                onClick={() => setFilterPrice("allResultsPrice")}
              >
                clear price filter
              </div>
              <div style={{ fontWeight: "bold", fontSize: "16px" }}>Price:</div>
              <div className="price-filter-container">
                <div className="price-filter-options">
                  <div
                    className={
                      filterPrice === "$"
                        ? "filter-price-buttons-first price-active-filter-bg-first"
                        : "filter-price-buttons-first"
                    }
                    onClick={() => setFilterPrice("$")}
                  >
                    $
                  </div>
                  <div
                    className={
                      filterPrice === "$$"
                        ? "filter-price-buttons-mid price-active-filter-bg-mid"
                        : "filter-price-buttons-mid"
                    }
                    onClick={() => setFilterPrice("$$")}
                  >
                    $$
                  </div>
                  <div
                    className={
                      filterPrice === "$$$"
                        ? "filter-price-buttons-last price-active-filter-bg-last"
                        : "filter-price-buttons-last"
                    }
                    onClick={() => setFilterPrice("$$$")}
                  >
                    $$$
                  </div>
                </div>
              </div>
              <div
                className={
                  filterType === "allResultsType" ? "clear-filter-buttons-inactive" : "clear-filter-buttons-active"
                }
                onClick={() => setFilterType("allResultsType")}
              >
                clear category filter
              </div>
              <div style={{ fontWeight: "bold", fontSize: "16px" }}>Type:</div>
              <div className="type-filter-container">
                <div className="type-filter-option-container">
                  <button
                    className={
                      filterType === "American" ? "filter-type-buttons type-active-filter-bg" : "filter-type-buttons"
                    }
                    onClick={() => setFilterType("American")}
                  >
                    {filterType === "American" ? (
                      <i className="filter-checkmark" class="fa-solid fa-check"></i>
                    ) : (
                      <div>&nbsp;</div>
                    )}
                  </button>
                  <div>American</div>
                </div>
                <div className="type-filter-option-container">
                  <button
                    className={
                      filterType === "Mexican" ? "filter-type-buttons type-active-filter-bg" : "filter-type-buttons"
                    }
                    onClick={() => setFilterType("Mexican")}
                  >
                    {filterType === "Mexican" ? (
                      <i className="filter-checkmark" class="fa-solid fa-check"></i>
                    ) : (
                      <div>&nbsp;</div>
                    )}
                  </button>
                  <div>Mexican</div>
                </div>
                <div className="type-filter-option-container">
                  <button
                    className={
                      filterType === "Korean" ? "filter-type-buttons type-active-filter-bg" : "filter-type-buttons"
                    }
                    onClick={() => setFilterType("Korean")}
                  >
                    {filterType === "Korean" ? (
                      <i className="filter-checkmark" class="fa-solid fa-check"></i>
                    ) : (
                      <div>&nbsp;</div>
                    )}
                  </button>
                  <div>Korean</div>
                </div>
                <div className="type-filter-option-container">
                  <button
                    className={
                      filterType === "Italian" ? "filter-type-buttons type-active-filter-bg" : "filter-type-buttons"
                    }
                    onClick={() => setFilterType("Italian")}
                  >
                    {filterType === "Italian" ? (
                      <i className="filter-checkmark" class="fa-solid fa-check"></i>
                    ) : (
                      <div>&nbsp;</div>
                    )}
                  </button>
                  <div>Italian</div>
                </div>
                <div className="type-filter-option-container">
                  <button
                    className={
                      filterType === "African" ? "filter-type-buttons type-active-filter-bg" : "filter-type-buttons"
                    }
                    onClick={() => setFilterType("African")}
                  >
                    {filterType === "African" ? (
                      <i className="filter-checkmark" class="fa-solid fa-check"></i>
                    ) : (
                      <div>&nbsp;</div>
                    )}
                  </button>
                  <div>African</div>
                </div>
                <div className="type-filter-option-container">
                  <button
                    className={
                      filterType === "Japanese" ? "filter-type-buttons type-active-filter-bg" : "filter-type-buttons"
                    }
                    onClick={() => setFilterType("Japanese")}
                  >
                    {filterType === "Japanese" ? (
                      <i className="filter-checkmark" class="fa-solid fa-check"></i>
                    ) : (
                      <div>&nbsp;</div>
                    )}
                  </button>
                  <div>Japanese</div>
                </div>
                <div className="type-filter-option-container">
                  <button
                    className={
                      filterType === "Chinese" ? "filter-type-buttons type-active-filter-bg" : "filter-type-buttons"
                    }
                    onClick={() => setFilterType("Chinese")}
                  >
                    {filterType === "Chinese" ? (
                      <i className="filter-checkmark" class="fa-solid fa-check"></i>
                    ) : (
                      <div>&nbsp;</div>
                    )}
                  </button>
                  <div>Chinese</div>
                </div>
                <div className="type-filter-option-container">
                  <button
                    className={
                      filterType === "Desert" ? "filter-type-buttons type-active-filter-bg" : "filter-type-buttons"
                    }
                    onClick={() => setFilterType("Desert")}
                  >
                    {filterType === "Desert" ? (
                      <i className="filter-checkmark" class="fa-solid fa-check"></i>
                    ) : (
                      <div>&nbsp;</div>
                    )}
                  </button>
                  <div>Desert</div>
                </div>
              </div>
            </div>
            <div>
              {priceBusinessesArr.length === 0 ? 
              <div className="restraunts-container">
              <div className="restraunts-wrapper">
                  <div className="login-container-PNF">
                      <div className="restraunt-filter-no-data-container">
                          <img className="logo-PNF" src={zelpLogo}></img>
                          <div className="title-PNF">No Results Found</div>
                      </div>
                  </div>
              </div>
          </div> :
              priceBusinessesArr.map((business) => {
                return (
                  <>
                    <div className="singleBusinessContainer" key={business.id}>
                      <div className="main-left-side-container">
                        <NavLink to={`/businesses/${business.id}`}>
                          <img
                            className="single-image"
                            src={business.preview_image}
                            alt={brokenImage}
                            onError={(e) => {
                              e.currentTarget.src = brokenImage;
                            }}
                          ></img>
                        </NavLink>
                      </div>
                      <div className="main-right-side-container">
                        <NavLink to={`/businesses/${business.id}`}>
                          <div className="business-name-caption">{business.business_name}</div>
                        </NavLink>
                        <div className="business-captions">
                          {" "}
                          {business.city}, {business.state}
                        </div>
                        <div className="business-captions">Category: {business.category}</div>
                        <div className="detailsAndComment">
                          <img className="descriptionAndComment" src={commentbox} alt="commentbox"></img>
                          <div className="business-descriptions-hp"> {business.description}</div>
                        </div>
                        <div>
                          <img className="home-takeout-pic" src={options} />
                        </div>
                        {/* <div className="business-captions">Average Cost = ${business.price}.00</div> */}
                        {/* <div className="business-captions">{business.description}</div> */}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <footer className="parentFooter">
          <div class="footer-home">
            <img className="ourRepo" src={githubIcon} alt="ourRepo" />
            <div className="footer-home-wrap-containers">
              <a className="text-for-github" href="https://github.com/Justinguu/zelp">
                {" "}
                https://github.com/Justinguu/zelp
              </a>
              &nbsp; &nbsp; &nbsp;
              <img className="linkedin" src={linkedIn} alt="linkedin"></img>
              <a className="text-for-github" href="https://www.linkedin.com/in/jung-gu-b69b98154/">
                {" "}
                https://www.linkedin.com/in/jung-gu-b69b98154/
              </a>
              &nbsp; &nbsp; &nbsp;Copyright 2022. All Rights Reserved.
            </div>
          </div>
        </footer>
      </div>
    );
  }
};

export default GetAllTheBusinesses;
