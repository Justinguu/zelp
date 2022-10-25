import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import loginPic from '../icons/loginPic.png';
import './SignUpForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [zip_code, setZipCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [errorValidation, setErrorValidation] = useState([]);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  useEffect(() => {
    let errors = [];

    if (first_name.length > 25 || first_name.length < 2) errors.push("First name must be between 2 and 25 characters");
    if (last_name.length > 25 || last_name.length < 2) errors.push("Last name must be between 2 and 25 characters");
    if (zip_code.length !== 5) errors.push("Zip code must be 5 digits");
    if (!password.length) errors.push("Password is required");
    if (!repeatPassword.length) errors.push("Please repeat the password")

    setErrorValidation(errors)

  }, [first_name, last_name, username, email, password, repeatPassword, zip_code, profileImage])


  const onSignUp = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      return setErrorValidation(["Please enter a valid email address"]);
    }

    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(first_name,last_name, username, email, password,repeatPassword, profileImage));
      if (data) {
        setErrors(data)
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

  const updateProfileImage = (e) => {
    setProfileImage(e.target.value);
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className='signup-pic-container'>  <img src={loginPic} alt='' className='signup-picture'></img></div>
    <div className='signup-whole-container'>
      <div className='zelp-signup'>Sign up for Zelp</div>
    
   
    <form  className='signup-form' onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
    
      
      {/* <div className='zelp-connect'>Connect with great local businesses</div> */}

      <div className='first-last-input'>
        <label className='signuo-first-name'></label>
        <input
          type='text'
          name='first_name'
          placeholder='First Name'
          onChange={updateFirstName}
          value={first_name}
          required={true}
        ></input>
        <label></label>
        <input
          type='text'
          name='last_name'
          placeholder='Last Name'
          onChange={updateLastName}
          value={last_name}
          required={true}
          ></input>
          </div>

          <div className='signup-input'>
        <label className="signup-input"></label>
        <input
          type='text'
          className= "signup-inputs"
          name='username'
          placeholder='Username'
          onChange={updateUsername}
          value={username}
          required={true}
        ></input>
      </div >
      
      <div className='signup-input'>
        <label className="signup-input"></label>
        <input
          type='text'
          className= "signup-inputs"
          name='email'
          placeholder='Email'
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>
      </div >
      <div className='signup-input'>
        <label className="signup-input"></label>
        <input
          type='password'
          className= "signup-inputs"
          name='password'
          placeholder='Password'
          onChange={updatePassword}
          value={password}
          required={true}
        ></input>
      </div>
      <div className='signup-input'>
        <label className="signup-input"></label>
        <input
          type='password'
          className= "signup-inputs"
          name='repeat_password'
          placeholder='Confirm Password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
         
      </div>
     
      <div className='signup-input'>
        <label className="signup-input"></label>
        <input
          type='profileImage'
          className= "signup-inputs"
          name='profileImage'
          placeholder='Profile Image'
          onChange={updateProfileImage}
          value={profileImage}
          required={true}
        ></input>
         
      </div>
      <button className='demo-button' type='submit'>Sign Up</button>
    </form>
    </div>
    </>
  );
};

export default SignUpForm;
