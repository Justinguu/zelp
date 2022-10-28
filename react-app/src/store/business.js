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

const createBusiness = (business) => {
    return {
        type: CREATE_BUSINESS,
        business
    };
}

const updateBusiness = (business) => {
    return {
        type: UPDATE_BUSINESS,
        business
    };
};

const deleteBusiness = (businessId) => {
    return {
        type: DELETE_BUSINESS,
        businessId
    };
}

//THUNKS

// get all businesses thunk
export const getAllBusinessesThunk = () => async (dispatch) => {
    const response = await fetch('/api/businesses/');
    const data = await response.json();
    dispatch(getAllBusinesses(data.businesses));
    return response;
};


// export const getAllBusinessesThunk = () => async (dispatch) => {
//     const response = await fetch('/api/businesses/');

//     if (response.ok) {
//     const businesses = await response.json();
//     dispatch(getAllBusinesses(businesses));
   
//     }
// };

export const getOneBusinessThunk = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}`);
    if (response.ok) {
    const business = await response.json();
    dispatch(getOneBusiness(business));
    }
};

// create business thunk
export const createBusinessThunk = (owner_id,business_name,phone_number,email,address,city,state,country,zip_code,description,price,preview_image) => async (dispatch) => {
    const response = await fetch("/api/businesses/new", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({owner_id,business_name,phone_number,email,address,city,state,country,zip_code,description,price,preview_image})
      });
    
      if (response.ok) {
        const data = await response.json();
        dispatch(createBusiness(data));
        return data;
      }
    };


//update business thunk with fetch including  business id
export const updateBusinessThunk = (businessId,owner_id,business_name,phone_number,email,address,city,state,country,zip_code,description,price,preview_image) => async (dispatch) => {
    zip_code = parseInt(zip_code)
    

    const response = await fetch(`/api/businesses/${businessId}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({owner_id,business_name,phone_number,email,address,city,state,country,zip_code,description,price,preview_image})
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateBusiness(data));
    }
}
// export const updateBusinessThunk = (owner_id,business_name,phone_number,email,address,city,state,country,zip_code,description,price,preview_image,businessId) => async (dispatch) => {
//     const response = await fetch(`/api/businesses/${businessId}/edit`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(owner_id,business_name,phone_number,email,address,city,state,country,zip_code,description,price,preview_image)
//     });

//     if (response.ok) {
//         const data = await response.json();
//         dispatch(updateBusiness(data));
       
//     }
// }


export const deleteBusinessThunk = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/delete`, {
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
            const newState = {...action.businesses}
            return newState;
    }
        case GET_ONE_BUSINESS: {
            const newState = {...state};
            newState[action.business.id] = action.business;
            return newState;
            // const newState = {...action.business}
            // return newState;
    }
        case CREATE_BUSINESS: {
            const newState = { ...state };
            newState[action.business.id] = action.business;
            return newState;
        } 
        case UPDATE_BUSINESS: {
            const newState = { ...state };
            newState[action.business.id] = action.business;
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
       
