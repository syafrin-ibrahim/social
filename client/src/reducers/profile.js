
import { GET_PROFILE, GET_PROFILES, GET_REPOS, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE } from "../actions/types";


const initialState = {
    profile : null,
    profiles : [],
    repos : [],
    load : true,
    error: {}
}

export default function profile(state= initialState, action){
    const {type, payload} = action;

    
    switch (type) {
        case GET_PROFILE :       
        case UPDATE_PROFILE :
            return {
                ...state,
                profile : payload,
                load : false
            }
        case GET_PROFILES :
            return {
                ...state,
                profiles: payload,
                load: false
            }
        case GET_REPOS :
            return {
                ...state,
                repos : payload,
                load: false
            }
        case PROFILE_ERROR : 
      
            return {
                ...state,
                error : payload,
                load : false
            }
            
        case CLEAR_PROFILE : 
      
            return {
                ...state,
                profile : null,
                repos : [],
                load : false
            }
            

        default:
            return state;
    }
}