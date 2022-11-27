import { useDispatch,useSelector } from "react-redux";
import { deleteImageThunk, getOneImageThunk } from "../../../store/image";

import "./imageDelete.css";

const ImageDelete = ({ businessId, id, setShowImageDelete }) => {
    const dispatch = useDispatch();
   const currBusiness = useSelector((state) => state.business[businessId]);
    

   



    const deleteImageHandle = async (e) => {
        e.preventDefault();
      
        dispatch(deleteImageThunk(businessId, id)).then(() => setShowImageDelete(false))
        // .then(() => getOneImageThunk(businessId));
    }

    return (
        <div className="delete-container">
            <div className="delete-review-text"> Are you sure you want to delete this image?</div>
            <div className="delete-review-buttonss">
                <button className="delete-button" onClick={deleteImageHandle}>Yes</button>
                <button className="delete-button" onClick={() => setShowImageDelete(false)}>No</button>
                </div>
                </div>
    )



}
export default ImageDelete