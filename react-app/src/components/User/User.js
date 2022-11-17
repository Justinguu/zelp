import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./User.css"

function User() {
  const [user, setUser] = useState({});

  const { userId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const business = useSelector((state) => state.businesses);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  let numBusinesses = 0;
  if (user.businesses) {
    numBusinesses = user.businesses.length;
  }

  let numReviews = 0;
  if (user.reviews) {
    numReviews = user.reviews.length;
  }

  //make a list of all the businesses the user has created in jsx and then render i
  let businessList = [];
  if (user.businesses) {
    businessList = user.businesses.map((business) => (
      <div key={business.id}>
        <a href={`/businesses/${business.id}`}>{business.business_name}</a>
      </div>
    ));
  }
  // let reviewList = [];
  // if (user.reviews) {
  //   reviewList = user.reviews.map((review) => (
  //     <div key={review.id}>
  //       <a href={`/businesses/${review.businessId}`}>{review.review}</a>
  //     </div>
  //   ));
  // }


 
  return (
    <div className="user-container">
      <div></div>
      <div className="user-wrapper">
        <h1>Welcome {user.username} </h1>
        <div className="user-form-left">
          <div className="user-id-strong">
            <strong>User Id</strong> {userId}
          </div>
       
          <div className="user-emails">
            <strong>Email</strong> {user.email}
          </div>
        </div>
        <div><strong>Number Of Businesses Owned:</strong> &nbsp;{numBusinesses}</div>
        <div className="user-businessList">{businessList}</div>
       
        
        <div><strong>Number Of Reviews:</strong>&nbsp;{numReviews}</div>
        
      
       
      </div>
        <div>
          <img src={user.profileImage} className="user-pfImage" alt="user profile" />
        </div>
    </div>
  );
}
export default User;
