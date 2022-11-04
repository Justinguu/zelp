import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { updateBusinessThunk, getOneBusinessThunk } from "../../store/business";
import "./businessEdit.css";

function BusinessEditForm({ setShowUpdate }) {
  const ownerId = useSelector((state) => state.session.user.id);

  const { businessId } = useParams();
  const prefilledBizInfo = useSelector((state) => state.business[businessId]);

  const [businessName, setBusinessName] = useState(
    prefilledBizInfo.business_name
  );
  const [phoneNumber, setPhoneNumber] = useState(prefilledBizInfo.phone_number);
  const [email, setEmail] = useState(prefilledBizInfo.email);
  const [address, setAddress] = useState(prefilledBizInfo.address);
  const [city, setCity] = useState(prefilledBizInfo.city);
  const [state, setState] = useState(prefilledBizInfo.state);
  const [country, setCountry] = useState(prefilledBizInfo.country);
  const [zipCode, setZipCode] = useState(prefilledBizInfo.zip_code);
  const [description, setDescription] = useState(prefilledBizInfo.description);
  const [price, setPrice] = useState(prefilledBizInfo.price);
  const [previewImage, setPreviewImage] = useState(
    prefilledBizInfo.preview_image
  );

  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const errors = [];
    if (businessName.length > 30 || businessName.length < 2)
      errors.push("Business name must be between 2 and 30 characters");
    if (phoneNumber.length !== 12)errors.push("Phone number must be 10 digits & resemble the placeholder format");
    if (!email.includes("@") && email.length > 30)errors.push("Please enter a valid email address & can't be over 30 characters");
    if (address.length > 60 || address.length < 10)
      errors.push("Address must be between 10 and 60 characters");
    if (city.length > 20 || city.length < 2)
      errors.push("City must be between 2 and 20 characters");
    if (state === "Select a state") errors.push("Please provide a state");
    if (country.length > 30 || country.length < 2)
      errors.push("Country must be between 2 and 30 characters");
    if (description.length > 300 || description.length < 50)
      errors.push("Description must be between 50 and 300 characters");
    if (zipCode.toString().length != 5)
      errors.push("Zip code must be 5 digits");
    if (price > 100 || price < 2)
      errors.push("Price must be between 2 and 100 integer");
    if (!previewImage)errors.push("Please provide a PreviewImage")
    return setErrors(errors);
  }, [
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
  ]);
  // console.log(zipCode.length)

  async function onSubmit(e) {
    e.preventDefault();
    if (errors.length > 0) {
      return alert(
        "Please fix the following errors before submitting the form: "
      );
    }
    setHasSubmitted(true);

    function loadImage(previewImage) {
      return previewImage;
    }
    if (loadImage(previewImage)) {
      dispatch(
        updateBusinessThunk(
          businessId,
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
      );
    }
    setShowUpdate(false);
  }
  return (
    <form onSubmit={onSubmit} className="spot-form-update">
      <h2 className="Edit-biz-text">Edit Your Business</h2>
      <div className="edit-error-box">
        {errors.length > 0 && (
          <ul>
            {errors.map((error) => (
              <div className="edit-error-lst" key={error}>
                {error}
              </div>
            ))}
          </ul>
        )}
      </div>

      <div></div>
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
        />

        <input
          className="form-input-bizedit"
          type="email"
          placeholder="Business@gmail.com"
          value={email}
          maxLength="30"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-input-bizedit"
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          className="form-input-bizedit"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <select
            value={state}
            onChange={(e) => setState(e.target.value)} 
            className="select-form-input-bizedit"
        >
          <option disabled selected value="">Select a state</option>
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
          className="form-input-bizedit"
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <input
          className="form-input-bizedit"
          type="number"
          value={zipCode}
          min="1"
          onChange={(e) => setZipCode(e.target.value)}
        />

        <textarea
          className="form-input-textarea-edit"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="form-input-bizedit"
          type="number"
          value={price}
          min="2"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="form-input-bizedit"
          type="url"
          placeholder="Image URL"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
        />
      </div>

      <button
        className="submit-button-edits"
        type="submit"
        disabled={hasSubmitted && errors.length > 0}
      >
        Update Business
      </button>
    </form>
  );
}
export default BusinessEditForm;
