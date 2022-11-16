// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { getAllCategoriesThunk } from "../../store/categories";
// import "./categories.css";

// function GetCategories() {
//   const dispatch = useDispatch();
// // use useSelector to get the categories from the business state    

//   console.log("categories", businessCategories);
//   useEffect(() => {
//     dispatch(getAllCategoriesThunk());
//   }, [dispatch]);

//   return (
//     <div className="categories">
//       <h2>Categories</h2>
//       <div className="category-container">
//         <div className="category-wrapper">
//           {/* {categories.map((category) => (
//             <div className="category" key={category.id}>
//               <Link to={`/categories/${category.id}`}>
//                 <h3>{category.name}</h3>
//               </Link>
//             </div>
//           ))} */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GetCategories;
