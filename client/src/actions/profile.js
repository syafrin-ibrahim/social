import axios from 'axios';
import { setAlert } from './alert';
import { PROFILE_ERROR, GET_PROFILE} from './types';

export const getProfile = () => async dispatch=>{

    try{
        const res = await axios.get('/api/profile/me');

        dispatch({
            type : GET_PROFILE,
            payload : res.data
        })
    }catch(err){
       

        dispatch({
            type : PROFILE_ERROR,
            payload : { msg : err.response.statusText, status : err.response.status}
        })
    }

}

export const makeProfile = (form, history, edit = false) => async dispatch => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    try{
        const res = await axios.post('/api/profile', form, config);
        dispatch({
            type : GET_PROFILE,
            payload : res.data
        })
        //setAlert
        dispatch(setAlert(edit ? 'profile updated' : 'profile created', 'success'));
        //jika create profile
        if(!edit){
            history.push('/dashboard');
        }

    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            
        }

        dispatch({
            type : PROFILE_ERROR,
            payload : { msg : err.response.statusText, status : err.response.status}
        })
    }
}