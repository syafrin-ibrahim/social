import React, { useEffect , Fragment} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from '../../components/post/PostItem'
import { getSinglePost } from "../../actions/post";

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

