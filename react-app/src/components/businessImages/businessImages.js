import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getOneImageThunk } from "../../store/image";

const BusinessImages = ({ businessId }) => {
  const allImages = useSelector((state) => state.image);
  const getAllImagesArr = Object.values(allImages);

  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneImageThunk(businessId));
  }, [businessId]);

  return (
    <div className="images-header-container">
      {" "}
      {getAllImagesArr.map((image) => {
        return (
          <div>
            <img
              className="img-currSpots"
              src={image.imageUrl}
              alt={brokenBanner}
              onError={(e) => {
                e.currentTarget.src = brokenBanner;
              }}
            ></img>
          </div>
        );
      })}
    </div>
  );
};

export default BusinessImages;
