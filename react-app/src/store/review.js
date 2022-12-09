//TYPES
const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS';
const GET_CURR_REVIEW = 'reviews/GET_ONE_REVIEW';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';


//Action Creators
const getAllReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        reviews
    };
}

const getCurrReviews = (businessId) => {
    return {
        type: GET_CURR_REVIEW,
        businessId
    };
}

const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    };
}

const updateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    };
}

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    };
}

//THUNKS
export const getAllReviewsThunk = () => async (dispatch) => {
    const response = await fetch('/api/reviews');

    if (response.ok) {
    const reviews = await response.json();
    dispatch(getAllReviews(reviews));
    return reviews
    }
}

export const getCurrReviewThunk = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/reviews`);

    if (response.ok) {
    const review = await response.json();
    dispatch(getCurrReviews(review));
    return review
    }
}

export const createReviewThunk = (user_id,business_id,review,avg_rating) => async (dispatch) => {

    const response = await fetch(`/api/businesses/${business_id}/reviews/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id,business_id,review,avg_rating}),
        
    });

    if (response.ok) {
    const review = await response.json();
    dispatch(createReview(review));
    return review
    }
}

export const updateReviewThunk = (id,user_id,business_id,review,avg_rating) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${business_id}/reviews/${id}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({business_id,id,user_id,review,avg_rating})
    });

    if (response.ok) {
    const review = await response.json();
    dispatch(updateReview(review));
    }
}

export const deleteReviewThunk = (businessId,reviewId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/reviews/${reviewId}/delete`, {
        method: 'DELETE'
    });

    if (response.ok) {
    const deleted = await response.json();
    dispatch(deleteReview(deleted));
    }
}


//REDUCER

const initialState = {};
const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_REVIEWS: {
            const newState = {...action.reviews}
            return newState;
    }
        case GET_CURR_REVIEW: {
            const newState = {...action.businessId.reviews};
            return newState;
    }
        case CREATE_REVIEW: {
            const newState = {...state};
            newState[action.review.id] = action.review;
            return newState;
    }
        case UPDATE_REVIEW: {
            const newState = {...state};
            newState[action.review.id] = action.review;
            return newState;
    }
        case DELETE_REVIEW: {
            const newState = {...state};
            delete newState[action.reviewId];
            return newState;
    }
        default:
            return state;
    }
}



export default reviewReducer;