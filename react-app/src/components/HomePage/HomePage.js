import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, useParams, Redirect } from "react-router-dom";
import { getAllBusinessesThunk } from "../../store/business";
import { getAllUsersThunk } from "../../store/AllUsers";
import image1 from "../icons/image1.avif"
import image2 from "../icons/image2.avif"
import image3 from "../icons/image3.avif"
import githubIcon from '../icons/githubIcon.png'
import "./HomePage.css";



const GetAllTheBusinesses = () => {
    


    const history= useHistory();
    const dispatch = useDispatch();
    const {businessId} = useParams();
    const [submitted, setSubmitted] = useState(false);

    const business = useSelector(state => state.business);
    const allbusinessesArr = Object.values(business);
    const allusers = useSelector(state => state.allUsers);
    const sessionUser = useSelector(state => state.session.user)


    if (!sessionUser){
        <Redirect to="/login"></Redirect>
    }



let allbusinessesArray;
let allUsersArray;

   

 const slideShowPic = [image1,image2,image3]
    const [pictures, setPictures] = useState(slideShowPic[0]);
    const [counter, setCounter] = useState(0)


useEffect(() => {
    setPictures(slideShowPic[counter])
}, [counter])

useEffect(() => {
    const timer = setInterval(() => {
        setCounter((counter) => counter === 2 ? 0 : counter + 1)
    }, 4000)

    return () => clearInterval(timer)
}, [])

useEffect(() => {
    dispatch(getAllBusinessesThunk())}, [dispatch, allUsersArray, allbusinessesArray, submitted]);

useEffect(() => {
    dispatch(getAllUsersThunk())},[dispatch, allUsersArray]);




    return (
        <div className="homepage-container">
            <img className="hp-slideShowPic" alt='slideShow' src={pictures}/>
            <div className="best-resturants-text"></div>
            <div className="business-container"> 
            <div className="hp-header">Recent Actvity</div>
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
                                <div className="business-captions"> {business.city} {business.state}</div>
                                {/* <div className="business-captions">Average Cost = ${business.price}.00</div> */}
                                {/* <div className="business-captions">{business.description}</div> */}


                            </div>
                           

                        </div>
                        </>
                    )
                }
                )}
            </div>
            </div>
            <footer className="parentFooter">
    <div class="footer-home">
    Copyright 2022.  &nbsp; Zelp. All Rights Reserved.  &nbsp; &nbsp; &nbsp;
    <img className="ourRepo" src={githubIcon} alt="ourRepo"/>
    <div className="footer-home-wrap-containers">
      <a className="text-for-github" href="https://github.com/Justinguu/zelp"> https://github.com/Justinguu/zelp</a>
    </div>
      </div>
  </footer>
        </div>
    )



    

}

export default GetAllTheBusinesses;
