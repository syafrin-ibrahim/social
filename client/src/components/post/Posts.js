import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getAllPosts } from '../../actions/post'
import PostItem from './PostItem';


const Posts = ({ getAllPosts, post : { posts, load }, macth }) => {
    useEffect(() => {
        
            getAllPosts()
        
    }, [getAllPosts])
    return load ? (
                <Spinner /> 
            ) : (

                <Fragment>
                    <h1 className='large text-primary'>Posts</h1>
                    <p className='lead'>
                    <i className='fas fa-user' /> Welcome to the community
                    </p>
                    <div className="posts">
                        {
                            posts.map(post=>(
                                    <PostItem key={post._id} post={post} />
                            ))
                        }
                    </div>
                </Fragment>
            )        

}

Posts.propTypes = {
    getAllPosts : PropTypes.func.isRequired,
    post : PropTypes.object.isRequired,

}

const mapStateToProps = (state)=>{
    return{
        post : state.post
    }
}

export default connect(mapStateToProps, {getAllPosts})(Posts)
