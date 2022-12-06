import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, useParams, Redirect } from "react-router-dom";
import { getAllBusinessesThunk } from "../../store/business";
import { getAllUsersThunk } from "../../store/AllUsers";
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
  const allbusinessesArr = Object.values(business);
  const allusers = useSelector((state) => state.allUsers);
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) {
    <Redirect to="/login"></Redirect>;
  }

  let allbusinessesArray;
  let allUsersArray;

  const slideShowPic = [img1, img2, img3, img4, img5];
  const [pictures, setPictures] = useState(slideShowPic[0]);
  const [counter, setCounter] = useState(0);

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
  }, [dispatch, allUsersArray, allbusinessesArray, submitted]);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch, allUsersArray]);

 
  if (!sessionUser) {
    return (
      <div className="homepage-container">
        <div>
          <div className="create-business-quote">Can't Decide What To Eat? Sign Up With Zelp & Let Us Help You </div>
          <img className="-nlg-hp-slideShowPic" alt="slideShow" src={pictures} />
        </div>

        <div className="best-resturants-text"></div>
        <div className="business-container">
          {/* <div className="about-details">Welcome Food Lovers! Quickly Scope Out Where to Eat </div> */}
          <div className="hp-header"> Recently Added Busineess</div>
          <div className="nlg-business-wrapper">
            {allbusinessesArr.sort((a, b) => b.id - a.id).slice(0, 4).map((business) => {
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
        <div className="best-resturants-text"></div>
        <div className="business-container">
          <div className="about-details">Welcome Food Lovers! Quickly Scope Out Where to Eat </div>
          <div className="hp-header"> Zelp To A Resturant</div>
          <div className="business-wrapper">
            {allbusinessesArr.map((business) => {
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
