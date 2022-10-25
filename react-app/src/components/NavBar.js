
import React from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsersThunk } from '../store/AllUsers';
import { getAllBusinessesThunk } from '../store/business';

let NavBar;

 NavBar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBusinessesThunk());;
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  const business = useSelector(state => state.business);
  const user = useSelector(state => state.session.user);



  return (
    <nav className="nav-explore">
      <div className='NavBar'>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </div>
    </nav>
  );
}


export default NavBar;
