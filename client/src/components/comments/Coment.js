import React, { useEffect , Fragment} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from '../../components/post/PostItem'
import { getSinglePost } from "../../actions/post";
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Coment = ({ getSinglePost, post : { post, load}, match}) => {

    useEffect(()=>{
        getSinglePost(match.params.id); 
    },[getSinglePost])
    
    return   load || post === null ? ( <Spinner /> ):(
        <Fragment>
            <Link to='/posts' className='btn'>
            Back To Posts
            </Link>
            <PostItem post={post} showActions={false} />
            <CommentForm postId = {post._id} />
            <div className="comments">
                {
                    post.comments.map(cm =>(
                        <CommentItem key={cm._id} comment={cm} postId={post._id} />
                    ))
                }
            </div>
        </Fragment>
    )

}

Coment.propTypes = {
    getSinglePost : PropTypes.func.isRequired,
    post : PropTypes.object.isRequired
}

const mapStateToProps = (state)=>{
    return {
        post : state.post
    }
}

export default connect(mapStateToProps, { getSinglePost })(Coment);

