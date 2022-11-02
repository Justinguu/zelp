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
    if (!email.includes("@")) errors.push("Please enter a valid email address");
    if (address.length > 60 || address.length < 10) errors.push("Address must be between 10 and 60 characters");
    if (city.length > 20 || city.length < 2) errors.push("City must be between 2 and 20 characters");
    if (country.length >= 30 || country.length < 2)errors.push("Country must be between 2 and 30 characters");
    if (state.length > 20 || state.length < 2) errors.push("State must be between 2 and 20 characters");
    if (description.length > 400 || description.length < 2) errors.push("Description must be between 2 and 400 characters");
    if (zipCode.length !== 5 ) errors.push("Zip code must be 5 digits & be a number");
    if (price.length > 100 || price.length < 2 && typeof price != 'number') errors.push("Price must be between $2 - $100 numbers");
    return setErrors(errors);
}, [businessName, email, address, city, country, state, description, price]);
    
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
  <h3>Edit Your Busineess</h3>
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
        className="form-input-bizedit"
        type="text"
        placeholder="Business Name"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        />
        <input
        className="form-input-bizedit"
        type="tel"
        placeholder="678-211-4443"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        />

        <input
        className="form-input-bizedit"
        type="email"
        placeholder="Business@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />

        <input
        className="form-input-bizedit"
        type="text"
        placeholder="Address"
        maxLength="60"
        minLength="10"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        />

        <input
        className="form-input-bizedit"
        type="text"
        placeholder="City"
        maxLength="20"
        minLength="2"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        />

<select className="select-form-input-bizedit">
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
              value={state}
              onChange={(e) => setState(e.target.value)}
              
            </select>

        <input
        className="form-input-bizedit"
        type="text"
        placeholder="Country"
        maxLength="30"
        minLength="2"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
        />

        <input
        className="form-input-bizedit"
        type="number"
        maxLength="5"
        minLength="5"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        required
        />

        <input
        className="form-input-bizedit"
        type="text"
        placeholder="Description"
        maxLength="300"
        minLength="50"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        />

        <input
        className="form-input-bizedit"
        type="number"
        max="200"
        min="2"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        />

        <input
        className="form-input-bizedit"
        type="url"
        placeholder="Image URL"
        value={previewImage}
        onChange={(e) => setPreviewImage(e.target.value)}
        required
        />

       

    </div>

    <button className="submit-button-edits" type="submit" disabled={errors.length}>Update Business</button>

</form>

);
}
export default BusinessEditForm;