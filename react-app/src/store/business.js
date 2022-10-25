// TYPES
const GET_ALL_BUSINESSES = 'businesses/GET_ALL_BUSINESSES';
const GET_ONE_BUSINESS = 'businesses/GET_ONE_BUSINESS';
const CREATE_BUSINESS = 'businesses/CREATE_BUSINESS';
const UPDATE_BUSINESS = 'businesses/UPDATE_BUSINESS';
const DELETE_BUSINESS = 'businesses/DELETE_BUSINESS';




//Action Creators
const getAllBusinesses = (businesses) => {
    return {
        type: GET_ALL_BUSINESSES,
        businesses
    };
};

const getOneBusiness = (business) => {
    return {
        type: GET_ONE_BUSINESS,
        business
    };
}

const createBusiness = (businessId) => {
    return {
        type: CREATE_BUSINESS,
        businessId
    };
}

const updateBusiness = (payload) => {
    return {
        type: UPDATE_BUSINESS,
        payload
    };
};

const deleteBusiness = (businessId) => {
    return {
        type: DELETE_BUSINESS,
        businessId
    };
}

//THUNKS
export const getAllBusinessesThunk = () => async (dispatch) => {
    const response = await fetch('/api/businesses');

    if (response.ok) {
    const businesses = await response.json();
    dispatch(getAllBusinesses(businesses));
    }
};

export const getOneBusinessThunk = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}`);

    if (response.ok) {
    const business = await response.json();
    dispatch(getOneBusiness(business));
    }
}

export const createBusinessThunk = (business) => async (dispatch) => {
    const response = await fetch('/api/businesses/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(business)
    });

    if (response.ok) {
        const businessId = await response.json();
        dispatch(createBusiness(businessId));
        return businessId;
    }
}

export const updateBusinessThunk = (business) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${business.id}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(business)
    });

    if (response.ok) {
        const payload = await response.json();
        dispatch(updateBusiness(payload));
        return payload;
    }
}

export const deleteBusinessThunk = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(deleteBusiness(businessId));
    }
}


//REDUCER

const initialState = {};
const businessReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BUSINESSES: {
            const newState = {};
            action.businesses.forEach((business) => {
                newState[business.id] = business
            });
            return newState;
        }
        case GET_ONE_BUSINESS: {
            const newState = {...state, businessId}
            newState[action.business.id] = action.business;
            return newState;
        }
        case CREATE_BUSINESS: {
            const newState = {...state};
            newState[action.businessId] = action.business;
            return newState;
        }
        case UPDATE_BUSINESS: {
            const newState = {...state};
            newState[action.payload.business.id] = action.payload.business;
            return newState;
        }
        case DELETE_BUSINESS: {
            const newState = {...state};
            delete newState[action.businessId];
            return newState;
        }
        default:
            return state;
    }
}

export default businessReducer;
       
