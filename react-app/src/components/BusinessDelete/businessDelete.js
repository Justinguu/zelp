import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteBusinessThunk } from "../../store/business";
import './businessDelete.css'

const BusinessDelete = ({businessId, setShowDelete}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const deleteHandle = async (e) => {
        dispatch(deleteBusinessThunk(businessId)).then(() => setShowDelete(false)).then(() => history.push('/'))
    }
//
return (
    <>
    <div className='delete-container'>
              <div className="delete-review-text"> &nbsp;&nbsp;&nbsp;&nbsp; Are you sure you want to delete this business? </div>
      <div className="delete-buttons-container">
          <button className="delete-button" onClick={() => deleteHandle()}>YES</button>
      <button className="delete-button" onClick={() => setShowDelete(false)}>NO</button>
      </div>

    
      </div>
    </>
  );

}

export default BusinessDelete