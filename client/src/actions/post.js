import axios from 'axios';
import {setAlert } from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, 
    DELETE_POST, ADD_POST, GET_SINGLEPOST, ADD_COMMENT, REMOVE_COMMENT } from './types';


export const getAllPosts = ()=> async dispatch => {
    try{

        const res = await axios.get('/api/posts')

        dispatch({
            payload : res.data,
            type : GET_POSTS
        })

    }catch(err){
        dispatch({
            type : POST_ERROR,
            payload : { msg: err.response.statusText, status: err.res.status }
        })
    }
} 



export const addLike = (id)=> async dispatch =>{
    try{
        const res = await axios.put(`/api/posts/like/${id}`);
        dispatch({
            type : UPDATE_LIKES,
            payload : { id, likes:  res.data}
        })
    }catch(err){
        dispatch({
            type : POST_ERROR,
            payload : { msg : err.response.statusText, status: err.response.status}
        })
    }
}
export const removeLike = (id)=> async dispatch =>{
    try{
        const res = await axios.put(`/api/posts/unlike/${id}`);
        dispatch({
            type : UPDATE_LIKES,
            payload : { id, likes:  res.data}
        })
    }catch(err){
        dispatch({
            type : POST_ERROR,
            payload : { msg : err.response.statusText, status: err.response.status}
        })
    }
}

export const deletePost = (id)=> async dispatch => {
    if(window.confirm('yakin akan menghapus postingan ini ?')){
        try{
            const res = await axios.delete(`/api/posts/${id}`);
            dispatch({
                type : DELETE_POST,
                payload : id
            })
            dispatch(setAlert('Post Success Removed','success'));
        }catch(err){
            dispatch({
                type : POST_ERROR,
                payload : { msg : err.response.statusText, status: err.response.status}
            })
        }

    }
}

export const  addPost = (formData)=> async dispatch => {
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        try{
            const res = await axios.post(`/api/posts`, formData, config);
            dispatch({
                type : ADD_POST,
                payload : res.data
            })
            dispatch(setAlert('Post Success Created','success'));
        }catch(err){
            dispatch({
                type : POST_ERROR,
                payload : { msg : err.response.statusText, status: err.response.status}
            })
        }


}

export const getSinglePost = (id)=> async dispatch =>{
    try{
        const res = await axios.get(`/api/posts/${id}`);
            dispatch({
                type :  GET_SINGLEPOST,
                payload : res.data
            })

    }catch(err){
        dispatch({
            type : POST_ERROR,
            payload : { msg : err.response.statusText, status: err.response.status}
        })
    }
}

export const addComment = (postId, formData)=> async dispatch => {

    const config =  {
        'Content_Type' : 'application/json'
    }
    try{

        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);
        dispatch({
            type : ADD_COMMENT,
            payload : res.data
        })

        dispatch(setAlert('comment success added', 'success'));

    }catch(err){
        dispatch({
            type : POST_ERROR,
            payload : { msg : err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteComment = (postId, commentId)=> async dispatch => {
    if(window.confirm('yakin akan menghapus komen ini ?')){
    
        try{

            const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
            dispatch({
                type : REMOVE_COMMENT,
                payload : commentId
            })

            dispatch(setAlert('comment waas removed', 'success'));

        }catch(err){
            dispatch({
                type : POST_ERROR,
                payload : { msg : err.response.statusText, status: err.response.status}
            })
        }
    }
}

