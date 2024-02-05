import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, Redirect, useParams } from "react-router-dom";

import { createImageThunk } from "../../store/image";
import { getOneBusinessThunk } from "../../store/business";

import foodPhoto from "../icons/foodPhoto.webp";

import "./createBizImages.css";

const CreateBizImageForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { businessId } = useParams();
  const currBusiness = useSelector((state) => state.business[businessId]);

  const sessionUser = useSelector((state) => state.session.user);
  const owner_id = sessionUser.id;

  const [isLoaded, setIsLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getOneBusinessThunk(businessId)).then(() => setIsLoaded(true));
  }, [dispatch, businessId]);

  useEffect(() => {
    const errors = [];

    if (!imageUrl) errors.push("Please provide a image");
    if (description.length > 100) errors.push("Description cannot be over 300 characters long");

    setErrors(errors);
  }, [imageUrl, description]);

  if (sessionUser === null) {
    alert("You must be logged in to make add a photo");
    return <Redirect to="/" />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (errors.length <= 0) {
      // return alert("There was an error with your submission, Please recheck your inputs");
   

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (errors.length <= 0) {
          const formData = new FormData()
          formData.append("owner_id", owner_id);
          formData.append("businessId", businessId);
          formData.append("imageUrl", imageUrl);
          formData.append("description", description);
          // formData.append("video_views", video_Views);

    //       return dispatch(
    //         newVideoThunk(formData)
    //       )

// console.log("imageUrl", imageUrl)

    // const createdImage = dispatch(createImageThunk(owner_id, businessId, imageUrl, description));
   return dispatch(createImageThunk(formData)).then(() => history.push(`/businesses/${businessId}`))
  }
  return errors
 }
  //   if (createdImage) {
  //     history.push(`/businesses/${businessId}`);
  //   }
  // };

  const errorList = errors.map((error) => (
    <p className="create-review-single-error" key={error}>
      {error}
    </p>
  ));

  const imageSet = (e) => {
    const file = e.target.files[0];
  
    setImageUrl(file);
  };

  return (
    isLoaded && (
      <div className="create-image-container">
        <div className="create-image-wrapper">
          <div className="create-image-header">
            <NavLink to={`/businesses/${businessId}`}>
              <div className="create-image-business-title">{currBusiness.name}</div>
            </NavLink>
            <div className="title-add-photo">Add Photos To Your Business</div>
          </div>
          <div className="create-review-errors">{hasSubmitted && errorList}</div>
          <div className="create-image-form-container">
            <img className="photo-frame" src={foodPhoto}></img>
            <form className="create-image-form" onSubmit={onSubmit}>
              <div className="">
                {/* <input
                  className="imageUrl-field"
                  type="text"
                  placeholder="Image Url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                /> */}
                <input type="file" accept="image/*" onChange={imageSet} />
                <textarea
                  className="descriptionCreateImage"
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="create-review-submit-container">
                <button className="submitCreateComment" type="submit" disabled={hasSubmitted && errors.length > 0}>
                  Submit Image
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default CreateBizImageForm;
