import { createBusinessThunk, getAllBusinessesThunk } from "../../store/business";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./createBusiness.css";

export default function CreateBusinessForm() {

const owner = useSelector(state => state.session.user);
const ownerId = owner.id

// const businesses = useSelector((state) => state.business);
// const Allbusinesses = Object.values(businesses);
// console.log(Allbusinesses)
// console.log(ownerId)

const [businessName, setBusinessName] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [email, setEmail] = useState("");
const [address, setAddress] = useState("");
const [city, setCity] = useState("");
const [state, setState] = useState("");
const [country, setCountry] = useState("");
const [zipCode, setZipCode] = useState("");
const [description, setDescription] = useState("");
const [price, setPrice] = useState("");
const [previewImage, setPreviewImage] = useState("");

const [errors, setErrors] = useState([]);
const [hasSubmitted, setHasSubmitted] = useState(false);

const dispatch = useDispatch();
const history = useHistory();

useEffect(() => {
    const errors = [];
    if (businessName.length > 50 || businessName.length < 2) errors.push("Business name must be between 2 and 50 characters");
    if (phoneNumber.length !== 12) errors.push("Phone number must be 10 digits & resemble the placeholder format");
    if (!email.includes("@")) errors.push("Please enter a valid email address");
    if (address.length > 60 || address.length < 10) errors.push("Address must be between 10 and 60 characters");
    if (city.length > 20 || city.length < 2) errors.push("City must be between 2 and 20 characters");
    if (state.length > 20 || state.length < 2) errors.push("State must be between 2 and 20 characters");
    if (country.length > 20 || country.length < 2) errors.push("Country must be between 2 and 20 characters");
    if (zipCode.length !== 5) errors.push("Zip code must be 5 digits");
    if (description.length > 500 || description.length < 300) errors.push("Description must be between 175 and 300 characters");
    if (price.length > 100 || price.length < 2) errors.push("Price must be between $2 - $100 numbers");
    
    return setErrors(errors);
}, [businessName, phoneNumber, email, address, city, state, country, zipCode, description, price]);
    

if (ownerId === null) {
    alert("Please log in to create a business");
    return <Redirect to="/" />;
}

async function onSubmit(e) {
    e.preventDefault();
    setHasSubmitted(true);
    if (errors.length > 0) {
        return alert(
            "Please fix the following errors before submitting the form: " 
        );
    }

  function loadImage(previewImage) {
    return previewImage;
  }

  if(loadImage(previewImage)){
    dispatch(createBusinessThunk(ownerId,businessName,phoneNumber,email,address,city,state,country,zipCode,description,price,previewImage))
    .then(() => dispatch(getAllBusinessesThunk()))
    history.push("/");
  }

}

return (
    <div className="create-business-container">
        <div className="Whole-container">
            <h2 className="header-message">Create Your Business</h2>
            <div className="business-errors">
            {hasSubmitted && errors.length > 0 && (
            <ul>
              {errors.map((error) => (
                <li className="upload-img-errors-list" key={error}>{error}</li>
              ))}
            </ul>
            )}
            </div>
            <form onSubmit={onSubmit} className="create-business-form">
                <div className="all-input-business">
                    <input
                    className="business-input-field"
                    type="text"
                    placeholder="Business Name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                    />

                    
                    <input 
                    
                    className="business-input-field"
                    type="tel"
                    placeholder="678-211-4443"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    />

                   
                    <input
                    className="business-input-field"
                    type="email"
                    placeholder="Business@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />

                   
                    <input 
                    className="business-input-field"
                    type="text"
                    placeholder="Address"
                    maxLength="60"
                    minLength="10"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    />

                    
                    <input
                    className="business-input-field"
                    type="text"
                    placeholder="City"
                    maxLength="20"
                    minLength="2"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    />

                   
                    <input className="business-input-field"
                    type="text"
                    placeholder="state"
                    maxLength="20"
                    minLength="2"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    />
                   

                   
                    <input 
                    className="business-input-field"
                    type="text"
                    placeholder="Country"
                    maxLength="20"
                    minLength="2"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    />

                    
                    <input 
                    className="business-input-field"
                    type="text"
                    placeholder="Zip Code"
                    maxLength="5"
                    minLength="5"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                    />

                   
                    <input 
                    className="business-input-field"
                    type="text"
                    placeholder="Description"
                    maxLength="400"
                    minLength="2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    />

                   
                    <input 
                    className="business-input-field"
                    type="tele"
                    placeholder="21"
                    max="200"
                    min="2"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    />
                    <input 
                    className="business-input-field"
                    type="url"
                    placeholder="Image"
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                    required
                    />


                <button className="business-submit-button" type="submit">Submit</button>
                </div>

                </form>
        </div>
        </div>
);
              }
        







   
    














