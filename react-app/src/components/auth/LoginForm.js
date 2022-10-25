import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
        <div className='inner-login'>
          <form className='login-form' onSubmit={onLogin} autoComplete="off">
            <div id='login-banner'>
              <div id="circles-container">
                <img src={loginPic} alt='' id='circles'></img>
              </div>
              <div className='login-font'>
                Log in to zelp
              </div>
            </div>
            <div className='login-errors'>
            {errors.length ? "Email or Password is incorrect" : <></>}
            </div>
            <div className='label-input'>
              <label></label>
              <input
                name='email'
                type='text'
                value={email}
                onChange={updateEmail}
                autoFocus
              />
            </div>
            <div className='label-input'>
              <label id="password"></label>
              <input
                name='password'
                type='password'
                value={password}
                onChange={updatePassword}
              />
            </div>
            <div className="login-button">
              <button className='login-button' type='submit'>Log In</button>
            </div>
            <div className='demo-button'>
              <button className='demo-button' onClick={(e) => {
                setEmail('demo@aa.io');
                setPassword('password')
              }}>Demo Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>

  );
};

export default LoginForm;
