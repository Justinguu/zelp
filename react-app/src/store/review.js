//TYPES
const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS';
const GET_ONE_REVIEW = 'reviews/GET_ONE_REVIEW';
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

const getOneReview = (review) => {
    return {
        type: GET_ONE_REVIEW,
        review
    };
}

const createReview = (reviewId) => {
    return {
        type: CREATE_REVIEW,
        reviewId
    };
}

const updateReview = (payload) => {
    return {
        type: UPDATE_REVIEW,
        payload
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
    }
}

export const getOneReviewThunk = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`);

    if (response.ok) {
    const review = await response.json();
    dispatch(getOneReview(review));
    }
}

export const createReviewThunk = (review) => async (dispatch) => {
    const response = await fetch('/api/reviews/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });

    if (response.ok) {
    const review = await response.json();
    dispatch(createReview(review));
    }
}

export const updateReviewThunk = (review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${review.id}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });

    if (response.ok) {
    const review = await response.json();
    dispatch(updateReview(review));
    }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}/delete`, {
        method: 'DELETE'
    });

    if (response.ok) {
    dispatch(deleteReview(reviewId));
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
        case GET_ONE_REVIEW: {
            const newState = {...state};
            newState[action.review.id] = action.review;
            return newState;
    }
        case CREATE_REVIEW: {
            const newState = {...state};
            newState[action.reviewId] = action.review;
            return newState;
    }
        case UPDATE_REVIEW: {
            const newState = {...state};
            newState[action.payload.review.id] = action.payload.review;
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
