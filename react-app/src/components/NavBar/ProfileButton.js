import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";
import logoutLogo from "../icons/logoutLogo.png"
import "./ProfileButton.css"

export default function ProfileButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  const allbusinesses = useSelector((state) => state.business);
  const allbusinessesArr = Object.values(allbusinesses);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

//   const userBusinessesArr = allbusinessesArr.filter(
//     (image) => image.userId == sessionUser.id
//   );

  return (
    <div>
      <div className="profile-button-border" onClick={openMenu}>
        <img className="profile-btn-icon" src={sessionUser.profileImage} alt="" />
      </div>
      {showMenu && (
        <div className="profile-hp-dropdown">
          {sessionUser && (
            <div className="profile-list">
              <div className="user-name-li">
                Bonjour&nbsp;
                <div
                  className="profile-page-reroute"
                  to={`/users/${sessionUser.id}`}
                >
                  {sessionUser.username}!{" "}
                </div>
              </div>
              <div upload-photo-dropdown>
                <div className="three-item-container">
                  <div className="numOfImages">
                    {/* {userImagesArr.length} of 1,000 items */}
                  </div>
                 
                </div>
              </div>
              <div className="hover-link logout-li" onClick={logout}>
                <div className="logout-container">
                  <img className="logout-logo-pic" src={logoutLogo}></img>
                  <div className="logout-text">  Log Out  &nbsp; &nbsp;</div>
                
                </div>
                
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
