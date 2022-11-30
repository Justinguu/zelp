import { useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { getAllBusinessesThunk } from "../../store/business";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import brokenImage from "../icons/brokenImage.png";
import commentbox from "../icons/commentbox.png"
import "./searchPage.css"

export default function SearchPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { searchTerm } = useParams();

  const business = useSelector((state) => state.business);
  const allbusinessesArr = Object.values(business);

  let filteredBusinesses;
//
  if (allbusinessesArr != null) {
    filteredBusinesses = allbusinessesArr.filter((business) =>
      business.business_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  let filteredCategories;
  if (allbusinessesArr !== null) {
    filteredCategories = allbusinessesArr.filter((business) => {
      business.category.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  return (
    <>
      {filteredBusinesses != null ? (
        <div className="searchPageMainContainer">
          {filteredBusinesses &&
            filteredBusinesses.map((business) => {
              return (
                <>
                <div className="singleSearchBusinessContainer">
                  <div className="main-left-side-container">
                    {" "}
                    <NavLink to={`/businesses/${business.id}`}>
                      <img
                        className="single-image-search"
                        src={business.preview_image}
                        alt={brokenImage}
                        onError={(e) => {
                          e.currentTarget.src = brokenImage;
                        }}
                      ></img>
                    </NavLink>
                    <div className="main-right-side-container">
                    <NavLink to={`/businesses/${business.id}`}><div className="business-name-caption">{business.business_name}</div></NavLink>
                                <div className="business-captions"> {business.city}, {business.state}</div>
                               <div className="detailsAndComment">
                                <img className="descriptionAndComment" src={commentbox} alt="commentbox"></img>
                               <div className="business-descriptions-hp"> {business.description}</div>
                                </div>
                                
                    </div>
                  </div>
                  
                  </div>
                  
                </>
              );
            })}
        </div>
      ) : (
        ""
      )}
      
      {filteredCategories != null ? (
        <div>
          {filteredCategories &&
            filteredCategories.map((business) => {
              return (
                <>
                <div className="singleBusinessContainer">
                  <div className="main-left-side-container">
                    {" "}
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
                    <div className="main-right-side-container">
                    <NavLink to={`/businesses/${business.id}`}><div className="business-name-caption">{business.business_name}</div></NavLink>
                                <div className="business-captions"> {business.city}, {business.state}</div>
                               <div className="detailsAndComment">
                                <img className="descriptionAndComment" src={commentbox} alt="commentbox"></img>
                               <div className="business-descriptions-hp"> {business.description}</div>
                                </div>
                                
                    </div>
                  </div>
                  
                  </div>
                  
                </>
              );
            })}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
