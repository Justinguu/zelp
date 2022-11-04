import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import loginPic from "../icons/loginPic.png";
import "./SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [zip_code, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  // const [errorValidation, setErrorValidation] = useState([]);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

 

  useEffect(() => {
    let errors = [];

    if (first_name.length > 20 || first_name.length < 2)errors.push("First name must be between 2 and 25 characters");
    if (last_name.length > 20 || last_name.length < 2)errors.push("Last name must be between 2 and 25 characters");
    if(username.length > 15 || username.length <2) errors.push("Username must be between 2 and 15 characters");
    if (zip_code.length !== 5 || NaN) errors.push("Zip code must be 5 digits");
    if (password !== repeatPassword) errors.push("Passwords must match");
    if (!profileImage.endsWith(".png") && !profileImage.endsWith(".gif") && !profileImage.endsWith(".jpg")) errors.push("ProfileImage must end with png, jpg, or gif")
    


    setErrors(errors);
  }, [
    first_name,
    last_name,
    username,
    email,
    password,
    repeatPassword,
    zip_code,
    profileImage,
    
  ]);

  const onSignUp = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      return setErrors(["Please enter a valid email address"]);
    }

    

    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(
          first_name,
          last_name,
          username,
          email,
          password,
          profileImage
        )
      );
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateZipCode = (e) => {
    setZipCode(e.target.value);
  };

  const updateProfileImage = (e) => {
    setProfileImage(e.target.value);
  };

// if successful, redirect to home page

  if (user) {
    return <Redirect to="/" />;
  }
  return (
    <>
      {/* <div className='signup-pic-container'>
          <img src={loginPic} alt='' className='signup-picture'></img>
          </div> */}
      <div className="signup-whole-container">
        <div className="signup-form-wrapper">
          <div className="signup-form-left">
            <div className="zelp-signup">Sign up for Zelp</div>
            <form className="signup-form" onSubmit={onSignUp}>
              <div className="signup-errors">
                {errors.map((error, ind) => (
                  <div className="signup-individual" key={ind}>{error}</div>
                ))}
              </div>

              {/* <div className='zelp-connect'>Connect with great local businesses</div> */}

              <div>
               
                <input className="first-two-inputs"
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  onChange={updateFirstName}
                  value={first_name}
                  required={true}
                ></input>
                
                <input className="first-two-inputs"
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  onChange={updateLastName}
                  value={last_name}
                  required={true}
                ></input>
              </div>

              <input className="signup-input"
                type="text"
                name="username"
                placeholder="Username"
                onChange={updateUsername}
                value={username}
                required={true}
                autoComplete={false}
              ></input>

              
              <input className="signup-input"
                type="text"
                name="email"
                placeholder="Email"
                onChange={updateEmail}
                value={email}
                required={true}
              ></input>

              <div>
               
                <input className="signup-input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={updatePassword}
                  value={password}
                  autoComplete={false}
                  required={true}
                ></input>
              </div>
              <div>
               
                <input className="signup-input"
                  type="password"
                  name="repeat_password"
                  placeholder="Confirm Password"
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                ></input>
              </div>

              <div>
               
                <input className="signup-input"
                  type="number"
                  name="zip Code"
                  placeholder="Zip Code"
                  onChange={updateZipCode}
                  min="1"
                  value={zip_code}
                  required={true}
                ></input>
              </div>

              <div>
               
                <input className="signup-input"
                  type="text"
                  name="profileImage"
                  placeholder="Profile Image(Optional)"
                  onChange={updateProfileImage}
                  value={profileImage}
                  
                ></input>
              </div>
              <button className="signup-button" type="submit"disabled={errors.length} >
                Sign Up
              </button>
            </form>
          </div>
          <div classsName="signup-form-right">
            <img className="picture2" src={loginPic} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
