import {REGISTER_SUCCESS, REGISTER_FAIL, SIGN_IN, SIGN_ERROR} from '../actions/types';
const initialState = {
    token : localStorage.getItem('token'),
    isAuth : null,
    load : true,
    user : null
}

export default function(state= initialState, action){

const {type, payload} = action;

                switch (type) {
                    case SIGN_IN : 
                        return {
                            ...state,
                            ...payload,
                            isAuth : true,
                            load: false
                        }
                    case REGISTER_SUCCESS:
                        localStorage.setItem('token',payload.token);
                        return {
                            ...state,
                            ...payload,
                            isAuth: true,
                            load: false
                        }
                        
                    case REGISTER_FAIL:
                    case SIGN_ERROR : 
                        localStorage.removeItem('token');
                        return {
                            ...state,
                            token: null,
                            isAuth: false,
                            load: false
                        }
                        

                    default:
                        return state;
                }
}