
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  { addLike, removeLike, deletePost } from '../../actions/post';



const PostItem = ({ addLike, removeLike, auth, deletePost, post : { _id, text, name, avatar, user, likes, comments, date}}) => {
   
   //console.log(auth.user._id);
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                <img className="round-img" src={avatar} alt="no image" />
                <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{text}</p>
                <p className="post-date"><Moment format='YYYY/MM/DD'>{date}</Moment></p>
                <button onClick={e => addLike(_id)} type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-up">like</i>
                    <span>{ likes.length > 0 && <span>{ likes.length}</span>}</span>
                </button>
                <button onClick={e =>removeLike(_id)} type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-down">unlike</i>
                </button>
                <Link to={`/posts/${_id}`} className="btn btn-primary">Discussion  { `${_id}`} {' '} { comments.length > 0 && <span className='comment-count'>{comments.length}</span>}</Link>
                { !auth.load && user === auth.user._id &&

                    <button type="button" onClick={e =>deletePost(_id)} className="btn btn-danger"><i className="fas fa-times">delete</i>
                      </button>
                }

               
            </div>
        </div>
       
    )
}

PostItem.propTypes = {
    auth : PropTypes.object.isRequired,
    post : PropTypes.object.isRequired,
    addLike : PropTypes.func.isRequired,
    removeLike : PropTypes.func.isRequired,
    deletePost : PropTypes.func.isRequired
}

const mapStateToProps = (state)=>{
    return {
        auth : state.auth
    }
}

export default connect(mapStateToProps, {addLike, removeLike, deletePost})(PostItem)
