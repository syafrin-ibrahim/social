import React, { Fragment, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import  Spinner from "../layout/Spinner";
import { PropTypes } from "prop-types";
import { getProfile, deleteAccount } from "../../actions/profile";
import DashboardAction from "./DashboardAction";
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ getProfile, auth : { user }, profile : { profile, load } })=>{
useEffect(()=>{
    getProfile();
},[])

    return (load && profile === null ? <Spinner /> :
            <Fragment>
                <h1>Dashboard</h1>
                <p>
                    <i className="fas fa-user"></i>
                    Welcome  { user && user.name }
                </p>
                { profile !== null ? (
                    <Fragment>
                            <DashboardAction />
                            <Experience experience={profile.experience} />
                            <Education education={profile.education} />
                            <div class="my-2">
                                    <button className="btn btn-danger" >
                                        <i className="fas fa-user-minus"/> delete acccount
                                    </button>
                            </div>
                    </Fragment>
                ) : (
                    <Fragment>
                    <p>Profile belum Ada, silahakn isi profile disini</p>
                    <Link to="/create-profile" className="btn btn-primary">create</Link>
                    </Fragment>
                )
                
                }

            </Fragment>) 
    
}

Dashboard.propTypes = {
    getProfile : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired,
   
}

const mapStateToProps = (state)=>({
    auth : state.auth,
    profile : state.profile

})

export default connect(mapStateToProps, { getProfile})(Dashboard);