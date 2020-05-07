import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/post'

const CommentForm = ({ postId, addComment }) => {
    const [ form, setForm] = useState('');
    const text = form.text;

    const handleSubmit = (e)=>{
        e.preventDefault();
         addComment(postId, {text});
          setForm({
              text : ''
          });
       
    }

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
        console.log(e.target.value);
    }
    return (
        <div class='post-form'>
            <div class='bg-primary p'><h3>Beri Komentar</h3></div>
                <form class='form my-1' onSubmit={handleSubmit} >
                    <textarea  name='text' cols='30' rows='5' placeholder='Create a post' value={text} onChange={handleChange} required ></textarea>
                    <input type='submit' class='btn btn-dark my-1' value='Submit' />
                </form>
        </div>
    )
}


CommentForm.propTypes = {
    addComment : PropTypes.func.isRequired,
}


export default connect(null, { addComment})(CommentForm)
