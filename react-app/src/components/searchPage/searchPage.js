import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAllBusinessesThunk } from "../../store/business";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function SearchPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { searchTerm } = useParams();
  console.log(searchTerm)

  const business = useSelector((state) => state.business);
  const allbusinessesArr = Object.values(business);


  let filteredBusinesses;

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
console.log(filteredBusinesses)
  return <>
  {filteredBusinesses != null ? (<div>
    {filteredBusinesses && filteredBusinesses.map((business) => {
        return (
            <>
            {business.business_name}
            </>
        )
    })}
  </div>): ""}
  </>;
}
