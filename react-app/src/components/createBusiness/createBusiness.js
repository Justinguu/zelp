import {
  createBusinessThunk,
  getAllBusinessesThunk,
} from "../../store/business";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./createBusiness.css";

export default function CreateBusinessForm() {
  const owner = useSelector((state) => state.session.user);
  const ownerId = owner.id;

  // const businesses = useSelector((state) => state.business);
  // const Allbusinesses = Object.values(businesses);
  // console.log(Allbusinesses)
  // console.log(ownerId)
  //

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
    if (businessName.length > 50 || businessName.length < 2)
      errors.push("Business name must be between 2 and 50 characters");
    if (phoneNumber.length !== 12)
      errors.push("Phone number must be 10 digits & resemble the placeholder format");
    if (!email.includes("@")) errors.push("Please enter a valid email address");
    if (address.length > 60 || address.length < 10)
      errors.push("Address must be between 10 and 60 characters");
    if (city.length > 20 || city.length < 2)
      errors.push("City must be between 2 and 20 characters");
      if (country.length >= 30 || country.length < 2)errors.push("Country must be between 2 and 30 characters");
    if (zipCode.length !== 5  ) errors.push("Zip code must be 5 digits ");
    if (description.length > 300 || description.length < 50)
      errors.push("Description must be between 100 and 300 characters");
    if (price.length > 100 || price.length < 2)
      errors.push("Price must be between 2 - 100 numbers");
    return setErrors(errors);
  }, [
    businessName,
    phoneNumber,
    email,
    address,
    city,
    country,
    zipCode,
    description,
    price,
  ]);


  async function onSubmit(e) {
    e.preventDefault();
    if (errors.length > 0) {
      setHasSubmitted(true);
      return alert(
        "Please fix the following errors before submitting the form: "
        );
      }

    function loadImage(previewImage) {
      return previewImage;
    }

    if (loadImage(previewImage)) {
      dispatch(
        createBusinessThunk(
          ownerId,
          businessName,
          phoneNumber,
          email,
          address,
          city,
          state,
          country,
          zipCode,
          description,
          price,
          previewImage
        )
      ).then(() => dispatch(getAllBusinessesThunk()));
      history.push("/");
    }
  }

  return (
    <div className="create-business-container">
      <div className="Whole-container">
        <h2 className="header-message">Create Your Business</h2>
        <div className="business-errors">
          {hasSubmitted && errors.length > 0 && (
            <ul className="edit-errors">
              {errors.map((error) => (
                <div className="upload-img-errors-list" key={error}>
                  {error}
                </div>
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
              
            />

            <input
              className="business-input-field"
              type="tel"
              placeholder="678-211-4443"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              
            />

            <input
              className="business-input-field"
              type="email"
              placeholder="Business@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
            />

            <input
              className="business-input-field"
              type="text"
              placeholder="Address"
              maxLength="60"
              minLength="10"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              
            />

            <input
              className="business-input-field"
              type="text"
              placeholder="City"
              maxLength="20"
              minLength="2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              
            />

            <select className="business-input-field-select"
             value={state}
             onChange={(e) => setState(e.target.value)}
             
            >
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
             
            </select>

            
               <input
              className="business-input-field"
              type="text"
              placeholder="Country"
              maxLength="30"
              minLength="2"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              
            />

            <input
              className="business-input-field"
              type="number"
              placeholder="Zip Code"
              maxLength="5"
              minLength="5"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              
            />

            <input
              className="business-input-field"
              type="text"
              placeholder="Description"
              maxLength="300"
              minLength="50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              
            />

            <input
              className="business-input-field"
              type="number"
              placeholder="(Average Menu Price) Example = 12 will be automtically converted to '$' signs)"
              max="200"
              min="2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              
            />
            <input
              className="business-input-field"
              type="url"
              placeholder="Image URL"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              
            />

            <button className="business-submit-button" type="submit" disabled={ hasSubmitted && errors.length > 0}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
