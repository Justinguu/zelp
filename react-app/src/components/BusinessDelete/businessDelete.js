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

return (
    <>
    <div className='delete-container'>
      <p className="delete-spot-text"> &nbsp;&nbsp;&nbsp;&nbsp; Are you sure you want to Delete the spot? </p>
      <button className="delete-button" onClick={() => deleteHandle()}>YES</button>
      <button className="delete-button" onClick={() => setShowDelete(false)}>NO</button>
      </div>
    </>
  );

}

export default BusinessDelete