import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User/User';
import { authenticate } from './store/session';
import CreateBusinessForm from './components/createBusiness/createBusiness';
import GetAllTheBusinesses from './components/HomePage/HomePage.js';
import BusinessDetails from './components/businessDetails/businessDetails.js';
import GetCategories from './components/categories/categories';
import {PageNotFound} from "./components/PageNotFound/PageNotFound.js"
import SearchPage from "../src/components/searchPage/searchPage.js"
import UserProfile from './components/UserProf/userProfile';
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch> 
        <Route path='/' exact={true} >
         <GetAllTheBusinesses />
         {/* <GetCategories /> */}
        </Route>
        <Route path='/search/:searchTerm' exact={true} >
         <SearchPage />
        
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/user' exact={true}>
          <UserProfile />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/new" exact={true}>
          <CreateBusinessForm />
        </Route>
        <ProtectedRoute path='/businesses/:businessId' exact={true} >
          <BusinessDetails/>
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
         {/* < UserProfile /> */}
        </ProtectedRoute>
        <Route>
          <PageNotFound />
        </Route>
       
      </Switch>
    </BrowserRouter>
  );
}

export default App;
