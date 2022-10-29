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
        <div>
            <h2> Are you sure you want to delete this review?</h2>
            <div className="delete-review-button">
                <button onClick={deleteReviewHandle}>Yes</button>
                <button onClick={() => setShowReviewDelete(false)}>No</button>

            </div>
        </div>
    )
}
export default DeleteReviewForm
