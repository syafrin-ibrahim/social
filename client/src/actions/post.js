import axios from 'axios';
import {setAlert } from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST } from './types';


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
            payload : { msg: err.response.statuText, status: err.res.status }
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
            payload : { msg : err.response.statuText, status: err.response.status}
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
            payload : { msg : err.response.statuText, status: err.response.status}
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
                payload : { msg : err.response.statuText, status: err.response.status}
            })
        }

    }
}