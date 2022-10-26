import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { getAllBusinessesThunk } from "../../store/business";
import { getAllUsersThunk } from "../../store/AllUsers";
import "./HomePage.css";


const GetAllTheBusinesses = () => {
    const history= useHistory();
    const dispatch = useDispatch();
    const [imageState, setImageState] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const business = useSelector(state => state.business);
    const allbusinessesArr = Object.values(business);
    console.log("business", business);

    // const businesses = useSelector(state => state.businesses);
    const allusers = useSelector(state => state.allUsers);
    const user = useSelector(state => state.session.user);


let allbusinessesArray;
let allUsersArray;

useEffect(() => {
    dispatch(getAllBusinessesThunk())}, [dispatch, allUsersArray, allbusinessesArray, submitted]);

useEffect(() => {
    dispatch(getAllUsersThunk())},[dispatch, allUsersArray]);


    // if (!user) {
    //     return (
    //       <>
    //         <div>{history.push('/404')}</div>
    //       </>
    //     );
    //   }

    return (
        <div className="homepage-container">
            <div className="business-container"> 
            <div className="business-wrapper">
                {allbusinessesArr.map((business) => {
                    return (
                        <>
                        <div className="singleBusinessContainer" key={business.id}>
                            <Link to={`/business/${business.id}`}> 
                            <img
                                className="single-image"
                                src={business.preview_image}
                                alt=""
                                ></img>
                            </Link>
                            <div className="hide">{business.business_name}</div>

                        </div>
                        </>
                    )
                }
                )}
            </div>
            
            </div>
        </div>
    )



    

}

export default GetAllTheBusinesses;
