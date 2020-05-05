import {REGISTER_SUCCESS, REGISTER_FAIL,
        SIGN_IN, SIGN_ERROR,
        LOG_IN_SUCCESS,
        LOG_IN_FAIL,
        LOG_OUT,
        ACCOUNT_DELETE,
        CLEAR_PROFILE
    } from '../actions/types';
const initialState = {
    token : localStorage.getItem('token'),
    isAuth : null,
    load : true,
    user : null
}

export default function auth(state= initialState, action){

const {type, payload} = action;

                switch (type) {
                    case LOG_IN_SUCCESS : 
                    localStorage.setItem('token', payload.token);
                        return {
                            ...state,
                            ...payload,
                            isAuth : true,
                            load : false
                        }
                    case SIGN_IN : 
                        return {
                            ...state,
                            user : payload,
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
                    case LOG_IN_FAIL :
                    case SIGN_ERROR : 
                    case LOG_OUT : 
                    case ACCOUNT_DELETE : 
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