import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../../context/Modal";

import ImageDelete from "./ImageDelete/imageDelete";

import { getOneImageThunk } from "../../store/image";
import { getOneBusinessThunk } from "../../store/business";
import { getAllUsersThunk } from "../../store/AllUsers";

import brokenBanner from "../icons/brokenBanner.jpeg";
import cameraIcon from "../icons/cameraIcon.png";
import deleteIcon from "../icons/delete-icon.png";
import trashIcon from "../icons/trashIcon.png";
import "./businessImages.css";

const BusinessImages = ({ businessId, setShowAllBusinessImages }) => {
  const allImages = useSelector((state) => state.image);
  const getAllImagesArr = Object.values(allImages);

  const currBusiness = useSelector((state) => state.business[businessId]);
  const sessionUser = useSelector((state) => state.session.user);

  // delete last uploaded image from getAllImagesArr when you click on delete icon

  const [isLoaded, setIsLoaded] = useState(false);
  // const [currImage, setCurrImage] = useState(false);
  const [showImageDelete, setShowImageDelete] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersThunk);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOneImageThunk(businessId));
    dispatch(getOneBusinessThunk(businessId)).then(() => setIsLoaded(true));
  }, [dispatch, businessId, showImageDelete]);

  return (
    isLoaded && (
      <div className="all-images-modal-container">
        <div className="close-all-images-modal-container">
          <button
            className="close-all-images-modal"
            onClick={() => setShowAllBusinessImages(false)}
          >
            Close &nbsp;
          </button>
          <img
            className="close-icon"
            src={deleteIcon}
            onClick={() => setShowAllBusinessImages(false)}
          ></img>
        </div>
        <div className="all-images-business-title">
          <span>
            Photos from {currBusiness.business_name}
            <Link to={`/businesses/${businessId}/images/new`}>
              <button className="add-photo-bttn-modal">
                <img className="camera-icon" src={cameraIcon}></img>
                Add photos
              </button>
            </Link>
          </span>
        </div>
        <div className="images-headerr-container">
          <div className="all-images-header-container"></div>{" "}
          {getAllImagesArr.map((image) => {
            return (
              <div className="single-images-container">
                <img
                  className="img-currSpots-images"
                  src={image.imageUrl}
                  alt={brokenBanner}
                  onError={(e) => {
                    e.currentTarget.src = brokenBanner;
                  }}
                ></img>
                  <div className="delete-bttn-imagesss">{image.owner_id === sessionUser?.id && (
                  <button
                    className="delete-icon-images"
                    onClick={() => setShowImageDelete(true)}
                  >
                    <img className="deleteimageIcon" src={trashIcon}></img>
                  </button>
                )}</div>
                
                {showImageDelete && (
                  <Modal onClose={() => setShowImageDelete(true)}>
                    <ImageDelete
                      businessId={businessId}
                      id={image.id}
                      setShowImageDelete={setShowImageDelete}
                    />
                  </Modal>
                )}
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default BusinessImages;
