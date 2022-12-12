import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllBusinessesThunk } from "../../store/business";
import "./categories.css";

function GetCategories() {
  const dispatch = useDispatch();

  const businesses = useSelector((state) => state.business);
  const allbusinessesCatArr = Object.values(businesses);

  let Allcategories;

  useEffect(() => {
    dispatch(getAllBusinessesThunk());
  }, [dispatch]);

  // let categories = allbusinessesCatArr.reduce((acc, business) => {
  //   if (!acc[business.category]) {
  //     acc[business.category] = [];
  //   }
  //   acc[business.category].push(business);
  //   return acc;
  // }, {});



  // Allcategories = Object.values(categories);
  //  flattenedCategories = Allcategories.flat();
  console.log(Allcategories);

  return (
    <div className="categories">
      <h2>Categories</h2>
      <div className="category-container">
        <div className="category-wrapper">
          {}
          {/* {Allcategories.map((category) => (
            <div className="category" key={category.id}>
              <NavLink to={`/categories/${category.id}`}>
                <h3>{category.category}</h3>
              </NavLink>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default GetCategories;
