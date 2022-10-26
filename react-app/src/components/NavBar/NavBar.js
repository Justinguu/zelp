
import React from 'react';
import { useEffect } from 'react';
import { NavLink ,useHistory} from 'react-router-dom';
// import LogoutButton from '../auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';

import * as sessionActions from "../../store/session";
import { getAllUsersThunk } from '../../store/AllUsers';
import { getAllBusinessesThunk } from '../../store/business';

import klickrImage from "../icons/klickr-logo-title.png";
import uploadImage from '../icons/upload-icon.png'
import ProfileButton from "./ProfileButton.js";
import "./NavBar.css";



let NavBar;

NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllBusinessesThunk());;
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  const business = useSelector(state => state.business);
  const user = useSelector(state => state.session.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };
///

  if (user) {
    return (
      <nav className="nav-explore">
        <div className="NavBarLeftSide"> 
          <NavLink to="/">
            <img className="logo" src={klickrImage} alt="logo"/>
          </NavLink>
  
        </div>
        <div className="loggedInNav">
      
        </div>
        <div className="navbar-explore-container">
          <div className="explore-bttn-container">
            <NavLink  to="/new">
              <div className='create-business-hp'>For Business</div>
            </NavLink>
            <div className="logout-business-hp" onClick={logout}>
               Log Out 
              </div>
              {/* <div className='logout-business-hp'>Logout</div> */}
            
            {/* <ProfileButton user={user} /> */}
          </div>
        </div>
      </nav>
    );
  } if (!user) {
  return (
    <>
      <nav className="nav-explore-userless">
      <div className="NavBarLeftSide">
          <NavLink to="/">
            <img className="logo" src={klickrImage} alt="logo"/>
          </NavLink>
        </div>
        <div className="loggedOutSearchNav">
          </div>

        <div className="NavBarRightSide">
          <NavLink className="not-LI-font" to="/login">
            Log In
          </NavLink>
          <NavLink className="not-SU-font" to="/sign-up">
            Sign Up
          </NavLink>

        </div>
      </nav>
    </>
  );
};
}
export default NavBar;

