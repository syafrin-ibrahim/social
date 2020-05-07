import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../../actions/post'

const PostForm = ({ addPost }) => {
    const [ form, setForm ] = useState({
        text : ''
    });
    const text = form.text

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
       addPost({text});
    }

    return (
        <div class="post-form">
            <div class="bg-primary p">
                 <h3>Say Something...</h3>
            </div>
            <form class="form my-1" onSubmit={handleSubmit} >
                 <textarea name="text" cols="30" rows="5" value={form.text} placeholder="Create a post" onChange={handleChange} required></textarea>
                 <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost : PropTypes.func.isRequired,
}

export default connect(null, { addPost })(PostForm)
