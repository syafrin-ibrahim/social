import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_SINGLEPOST } from '../actions/types';

const initialState = {
    posts : [],
    post : null,
    load: true,
    error : {}
}

export default function (state = initialState, action){
    const { type, payload } = action

    switch (type) {
        case GET_POSTS : 
            return {
                ...state,
                posts : payload,
                load :false
            }
        case GET_SINGLEPOST : 
            return {
                ...state,
                post : payload,
                load :false
            }

        case ADD_POST : 
            return {
                ...state,
                posts : [payload, ...state.posts],
                load :false
            }
        case POST_ERROR : 
            return { 
                ...state,
                load : true,
                error : payload
            }
        case DELETE_POST : 
            return { 
                ...state,
                load : false,
                posts :  state.posts.filter(post=>post._id !== payload)
            }
        case UPDATE_LIKES : 
            return { 
                ...state,
                posts : state.posts.map(post => post === payload.id ? { ...post, likes: payload.likes} : post),
                load : false
            }
        default :
            return state
    }
}

