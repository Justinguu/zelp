import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { getAllBusinessesThunk } from "../../store/business";
import { getAllUsersThunk } from "../../store/AllUsers";
import "./HomePage.css";


const GetAllTheBusinesses = () => {
    const history= useHistory();
    const dispatch = useDispatch();
    const {businessId} = useParams();
    const [imageState, setImageState] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const business = useSelector(state => state.business);
    const allbusinessesArr = Object.values(business);
    // console.log("business", allbusinessesArr);

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
            <div className="best-resturants-text">Best resturants to eat at</div>
            <div className="business-container"> 
            <div className="business-wrapper">
                {allbusinessesArr.map((business) => {
                    return (
                        <>
                        <div className="singleBusinessContainer" key={business.id}>
                            <div className="main-left-side-container">
                            <NavLink to={`/businesses/${business.id}`}> 
                            <img className="single-image"src={business.preview_image}alt=""></img>
                            </NavLink>
                            </div>
                            <div className="main-right-side-container">
                                <NavLink to={`/businesses/${business.id}`}><div className="business-name-caption">{business.business_name}</div></NavLink>
                                <div className="business-captions">{business.address} {business.city} {business.state} {business.zip_code}</div>
                                <div className="business-captions">Average Cost = ${business.price}.00</div>
                                <div className="business-captions">{business.description}</div>


                            </div>
                           

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
