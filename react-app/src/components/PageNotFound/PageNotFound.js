import React, { useDebugValue } from "react";

import "./PageNotFound.css";
import { login } from '../../store/session';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import myLogo from "../icons/klickr-logo-title.png"
import PageNotHere from "../icons/PageNotHere.png"

export function PageNotFound() {

  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector(state => state.session.user);

  const onLogin = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'))
    history.push('/');
  };
if (!user) {

  return (
    <div className="login-containerPNF">
      <div className="inner-loginPNF">
        <div id="login-bannerPNF">
          <div id="circles-containerPNF">
            <img src={myLogo} alt="" id="circlesPNF"></img>
          </div>
          <h4 id="to-klickr1">Sign in Required</h4>
            <div className="button">
              <button className="loginform-bttns" onClick={onLogin}>
                Click here to login as Demo User
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
else return (
  <div className="login-containerPNF">
      <div className="inner-loginPNF">
        <div id="login-bannerPNF">
          <div id="circles-containerPNF">
            <img src={myLogo} alt="" className="PageNotFound-logo"></img>
          </div>
          <h4 id="to-klickr1">Page Not Found</h4>
          <div className="linkerror">
            <NavLink to="/" className='linkerrorText'>Click here to go home</NavLink>
          </div>
      <div className="PageNotHere-img">
        <img src={PageNotHere} alt=""/>
      </div>
        </div>
    </div>
    </div>
  );
}
