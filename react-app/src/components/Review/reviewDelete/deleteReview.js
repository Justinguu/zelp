import { useDispatch } from "react-redux";
import { deleteReviewThunk, getCurrReviewThunk } from "../../../store/review";
import './deleteReview.css'

const DeleteReviewForm = ({businessId,reviewId, setShowReviewDelete}) => {
const dispatch = useDispatch()

    const deleteReviewHandle = async (e) => {
        e.preventDefault()
        dispatch(deleteReviewThunk(businessId, reviewId)).then(()=> setShowReviewDelete(false)).then(() => getCurrReviewThunk(businessId))


    }

    return (
        <div className="delete-container">
            <div className="delete-review-text"> Are you sure you want to delete this review?</div>
            <div className="delete-review-buttonss">
                <button className="delete-button" onClick={deleteReviewHandle}>Yes</button>
                <button className="delete-button" onClick={() => setShowReviewDelete(false)}>No</button>

            </div>
        </div>
    )
}
export default DeleteReviewForm
