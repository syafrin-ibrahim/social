
import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from "../actions/types";


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
      
            return {
                ...state,
                profile : payload,
                load : false
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