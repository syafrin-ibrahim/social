import axios from 'axios';
import { setAlert } from './alert';
import { PROFILE_ERROR, GET_PROFILE,
     UPDATE_PROFILE, ACCOUNT_DELETE,
      CLEAR_PROFILE, GET_PROFILES, GET_REPOS} from './types';

export const getProfile = () => async dispatch =>{

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


export const addExperience = (form, history) => async dispatch =>{
    
    try{
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience', form, config);

        dispatch({
            type : UPDATE_PROFILE,
            payload : res.data
        });

        //set alert
        dispatch(setAlert('experience was added', 'success'));
        history.push('/dashboard');
    }catch(err){

       const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            
        }

        dispatch({
            type : PROFILE_ERROR,
            payload : { msg : err.response.statusText, status : err.response.status}
        });
    }

}
export const addEducation = (form, history) => async dispatch =>{
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    try{
        const res = await axios.put('/api/profile/education', form, config);

        dispatch({
            type : UPDATE_PROFILE,
            payload : res.data
        });

        //set alert
        dispatch(setAlert('education was added', 'success'));
        history.push('/dashboard');
    }catch(err){

        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            
        }

        dispatch({
            type : PROFILE_ERROR,
            payload : { msg : err.response.statusText, status : err.response.status}
        });
    }

}




//delete experience
export const deleteExperience = (id)=> async dispatch => {
    if(window.confirm('anda yakin akan menghapus data pengalaman anda ?')){

        try{
            const res = await axios.delete(`/api/profile/experience/${id}`);
            dispatch({
                type : UPDATE_PROFILE,
                payload : res.data
            })
    
            dispatch(setAlert('experince successremoved', 'success'));
        }catch(err){
            dispatch({
                type : PROFILE_ERROR,
                payload : { msg: err.response.statusText, status: err.response.status}
            })
        }
    }
}



//delete education
export const deleteEducation = (id)=> async dispatch => {
    if(window.confirm('anda yakin akan menghapus data pendidikan ?')){

        try{
            const res = await axios.delete(`/api/profile/education/${id}`);
            dispatch({
                type : UPDATE_PROFILE,
                payload : res.data
            });
    
            dispatch(setAlert('education success removed', 'success'));
        }catch(err){
            dispatch({
                type : PROFILE_ERROR,
                payload : { msg: err.response.statusText, status: err.response.status}
            });
        }
    }
}



// delete account 
export const deleteAccount = ()=> async dispatch =>{
    if(window.confirm('anda yakin akan menghapus akun anda ?')){
            try{
                const res = await axios.delete(`/api/profile`);
                dispatch({
                    type : CLEAR_PROFILE
                })
                dispatch({
                    type : ACCOUNT_DELETE
                })
                dispatch(setAlert('Your Account Has Been Deleted', 'success'));
            }catch(err){
                dispatch({
                    type : PROFILE_ERROR,
                    payload : { msg: err.response.statusText, status: err.response.status}

                })
            }
    }
}

// get all profile
export const getAllProfiles = ()=> async dispatch =>{
    dispatch({
        type : CLEAR_PROFILE
    });

    try{
        const res = await axios.get('/api/profile');

        dispatch({
            type  : GET_PROFILES,
            payload : res.data
        });
    }catch(err){

        dispatch({
            type : PROFILE_ERROR,
            payload : { msg: err.response.statusText, status: err.response.status}
        })
    }
}

//get profil by id
export const getProfilById = (id)=> async dispatch =>{

    try{
        const res = await axios.get(`/api/profile/user/${id}`);

        dispatch({
            type : GET_PROFILE,
            payload : res.data
        })
    }catch(err){
        dispatch({
            type : PROFILE_ERROR,
            payload : { msg: err.response.statusText, status: err.response.status}
        })
    }
}

//GET github username
export const getGithubRepo = (username)=> async dispatch =>{

    try{
        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type : GET_REPOS,
            payload : res.data
        })
    }catch(err){
        dispatch({
            type : PROFILE_ERROR,
            payload : { msg: err.response.statusText, status: err.response.status}
        })
    }
}