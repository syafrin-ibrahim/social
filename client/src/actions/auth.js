import { REGISTER_SUCCESS, REGISTER_FAIL, 
        SIGN_IN, SIGN_ERROR, 
        LOG_IN_SUCCESS,LOG_IN_FAIL, LOG_OUT, CLEAR_PROFILE} from './types';
import { setAlert } from './alert';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

//is sign in ? user =>memeriksa apakah user sudah login
export const loadUser = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try{
        const res = await axios.get('/api/auth');

        dispatch({
            type : SIGN_IN,
            payload : res.data
        });
    }catch(er){
        dispatch({
            type : SIGN_ERROR
            
        });
    }
}


// login user
export const login = ({ email, password })=> async dispatch =>  {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    
    const body = JSON.stringify({email, password});
     
    try{
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type : LOG_IN_SUCCESS,
            payload : res.data
        })
        dispatch(loadUser());
    }catch(err){
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type : LOG_IN_FAIL
        })
    }
    
}



// register user
export const register = ({ name, email, password })=> async dispatch =>  {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    
    const body = JSON.stringify({name, email, password});
     
    try{
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type : REGISTER_SUCCESS,
            payload : res.data
        })
        dispatch(loadUser());
    }catch(err){
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type : REGISTER_FAIL
        })
    }
    
}


// log out user
export const logout = ()=>dispatch =>  {

    dispatch({ type :  CLEAR_PROFILE});
    dispatch({ type :  LOG_OUT});
   
}
