import { GET_POSTS, POST_ERROR, UPDATE_LIKES,
     DELETE_POST, ADD_POST, GET_SINGLEPOST, ADD_COMMENT, REMOVE_COMMENT } from '../actions/types';

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
                posts : state.posts.map(post => post._id === payload.id ? { ...post, likes: payload.likes} : post),
                load : false
            }
        case ADD_COMMENT : 
            return { 
                ...state,
                post : {...state.post, comments: payload },
                load : false
            }
        case REMOVE_COMMENT : 
            return { 
                ...state,
                post : {
                    ...state.post,
                    comments : state.post.comments.filter(cm => cm._id !== payload),
                },
                load : false
            }
        default :
            return state
    }
}

