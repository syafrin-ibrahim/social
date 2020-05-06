import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { getProfilById } from '../../actions/profile';


const Profile = ( { getProfilById, profile : { profile, load }, auth, match}) => {
    useEffect(()=>{
        getProfilById(match.params.id)
    },[getProfilById])
    return (
        <div>
            {profile === null || load ? (
                <Spinner />
                ) : (
                    <Fragment><br/><br/><br/><br/><br/><br/><br/>
                    <Link to='/profiles' className='btn btn-light'>
                    Back To Profiles
                    </Link>
                    {
                            auth.isAuth &&
                            auth.load === false &&
                            auth.user._id === profile.user._id && (
                            <Link to='/edit-profile' className='btn btn-dark'>
                            Edit Profile
                            </Link>)
                    
                    }
                    <div class="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        { <ProfileAbout profile={profile} /> }
                    </div>
                    </Fragment>
                ) 
            }
        </div>
    )
}

Profile.propTypes = {
    getProfilById : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired
}
const mapStateToprops = state => ({
    profile : state.profile,
    auth : state.auth
})

export default connect(mapStateToprops, { getProfilById })(Profile)
