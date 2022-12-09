//action

const GET_ALL_IMAGES = 'images/GET_ALL_IMAGES';
const GET_ONE_IMAGE = 'images/GET_ONE_IMAGE';
const CREATE_IMAGE = 'images/CREATE_IMAGE';
const DELETE_IMAGE = 'images/DELETE_IMAGE';



//action creators
const getAllImages = (images) => {
    return {
        type: GET_ALL_IMAGES,
        images
    };
}

const getOneImage = (businessId) => {
    return {
        type: GET_ONE_IMAGE,
        businessId
    };
}

const createImage = (imageId) => {
    return {
        type: CREATE_IMAGE,
        imageId
    };
}

const deleteImage = (imageId) => {
    return {
        type: DELETE_IMAGE,
        imageId
    };
}

//thunks

export const getAllImagesThunk = () => async (dispatch) => {
    const response = await fetch('/api/images/all');

    if (response.ok) {
    const images = await response.json();
    dispatch(getAllImages(images));
    return images;
    }
}

export const getOneImageThunk = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/images`);

    if (response.ok) {
    const image = await response.json();
    dispatch(getOneImage(image));
    return image;
    }
}       

// export const createImageThunk = (owner_id,business_id,imageUrl,description) => async (dispatch) => {
//     const response = await fetch(`/api/businesses/${business_id}/images/new`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({owner_id,business_id,imageUrl,description})
//     });

//     if (response.ok) {
//         const image = await response.json();
//         dispatch(createImage(image));
//     }
// }
export const createImageThunk = (formData) => async (dispatch) => {
    const response = await fetch(`/api/businesses/images/new`, {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body:formData
    });

    if (response.ok) {
        const image = await response.json();
        dispatch(createImage(image));
    }
}

// export const deleteImageThunk = (businessId,id) => async (dispatch) => {
//     const response = await fetch(`/api/businesses/${businessId}/images/${id}/delete`, {
//         method: 'DELETE',
//     })

//     if (response.ok) {
//         dispatch(deleteImage(id))
        
//     }
// }
//delete image thunk
export const deleteImageThunk = (businessId,id) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/images/${id}/delete`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(deleteImage(id))
    }
}


//reducer

const initialState = {};
const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_IMAGES: {
            const newState = {...action.images}
            return newState;
    }
        case GET_ONE_IMAGE: {
            const newState = {...action.businessId.images};
            return newState;
    }
        case CREATE_IMAGE: {
            const newState = {...state};
            newState[action.imageId.id] = action.imageId;
            return newState;
    }
    case DELETE_IMAGE: {
        const newState = {...state};
        delete newState[action.imageId];
        return newState;
    }
        default:
            return state;
    }
}

export default imageReducer;
