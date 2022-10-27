import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { updateBusinessThunk,getOneBusinessThunk } from "../../store/business";
import "./businessEdit.css";

function BusinessEditForm({ setShowUpdate }){
    const ownerId = useSelector(state => state.session.user.id);

const { businessId } = useParams();
const prefilledBizInfo = useSelector(state => state.business[businessId]);

const [businessName, setBusinessName] = useState(prefilledBizInfo.business_name);
const [phoneNumber, setPhoneNumber] = useState(prefilledBizInfo.phone_number);
const [email, setEmail] = useState(prefilledBizInfo.email);
const [address, setAddress] = useState(prefilledBizInfo.address);
const [city, setCity] = useState(prefilledBizInfo.city);
const [state, setState] = useState(prefilledBizInfo.state);
const [country, setCountry] = useState(prefilledBizInfo.country);
const [zipCode, setZipCode] = useState(prefilledBizInfo.zip_code);
const [description, setDescription] = useState(prefilledBizInfo.description);
const [price, setPrice] = useState(prefilledBizInfo.price);
const [previewImage, setPreviewImage] = useState(prefilledBizInfo.preview_image);

const [errors, setErrors] = useState([]);
const [hasSubmitted, setHasSubmitted] = useState(false);

const dispatch = useDispatch();

useEffect(() => {
    const errors = [];
    if (businessName.length > 50 || businessName.length < 2) errors.push("Business name must be between 2 and 50 characters");
    if (phoneNumber.length !== 10) errors.push("Phone number must be 10 digits");
    if (!email.includes("@")) errors.push("Please enter a valid email address");
    if (address.length > 60 || address.length < 10) errors.push("Address must be between 10 and 60 characters");
    if (city.length > 20 || city.length < 2) errors.push("City must be between 2 and 20 characters");
    if (state.length > 20 || state.length < 2) errors.push("State must be between 2 and 20 characters");
    if (country.length > 20 || country.length < 2) errors.push("Country must be between 2 and 20 characters");
    if (zipCode.length !== 5) errors.push("Zip code must be 5 digits");
    if (description.length > 400 || description.length < 2) errors.push("Description must be between 2 and 400 characters");
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
    dispatch(updateBusinessThunk(businessId,ownerId,businessName,phoneNumber,email,address,city,state,country,zipCode,description,price,previewImage))
    
  }
    setShowUpdate(false);
}
return (
<form onSubmit={onSubmit} className="spot-form-update">
<div>
  <h3>Edit Spot Form</h3>
</div>
{hasSubmitted && errors.length > 0 && (
        <ul className="edit-errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    <div className="edit-form-temp">
        <input
        className="form-input mid edit"
        type="text"
        placeholder="Business Name"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        />
        <input
        className="form-input mid edit"
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        />

        <input
        className="form-input mid edit"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />

        <input
        className="form-input mid edit"
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        />

        <input
        className="form-input mid edit"
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        />

        <input
        className="form-input mid edit"
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
        />

        <input
        className="form-input mid edit"
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
        />

        <input
        className="form-input mid edit"
        type="text"
        placeholder="Zip Code"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        required
        />

        <input
        className="form-input mid edit"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        />

        <input
        className="form-input mid edit"
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        />

        <input
        className="form-input last edit"
        type="text"
        placeholder="Image URL"
        value={previewImage}
        onChange={(e) => setPreviewImage(e.target.value)}
        required
        />

       

    </div>

    <button className="submit-button-edit" type="submit">Update Business</button>

</form>

);
}
export default BusinessEditForm;