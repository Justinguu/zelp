import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import loginPic from '../icons/loginPic.png';
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className='login-container'>
        <div className='login-wrapper'>
          <div className='login-right'>
            <div id='login-banner'>
           
              
              </div>
              
            </div>
          <form className='login-form' onSubmit={onLogin}>
             <div className='login-font'>
                Log in to zelp 
              </div> 
              <div className="new-to-zelp">New to Zelp? 
              <NavLink className='signup-redirect' to='/sign-up'>Sign up</NavLink>
              </div>
            <div className='login-errors'>
            {errors.length ? "Email or Password is incorrect" : <></>}
            </div>
            <div className='label-input'>
              <label></label>
              <input className='login-input'
                name='email'
                type='text'
                value={email}
                onChange={updateEmail}
                autoFocus
              />
            </div>
            <div className='label-input'>
              <label id="password"></label>
              <input className='login-input'
                name='password'
                type='password'
                value={password}
                onChange={updatePassword}
              />
            </div>
            <div className="login-button">
              <button className='login-button' type='submit'>Log In</button>
            </div>
            <div className='demoo-button'>
              <button className='demoo-button' onClick={(e) => {
                setEmail('demo@aa.io');
                setPassword('password')
              }}>Demo Login
              </button>
            </div>
          </form> 
          <div className='circles-container'>
                <img src={loginPic} alt='' id='circles'></img>
              </div>
        </div>
       
      </div>
    </>

  );
};

export default LoginForm;
