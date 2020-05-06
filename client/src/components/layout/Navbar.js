import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
const Navbar = ({ auth : {isAuth, load}, logout }) => {

    const authLink = (
        <ul>
             <li><Link to="/profiles">Members</Link></li>
            <li><a href="#!" onClick={logout} >
                <i className='fas fa-sign-out-alt' />{` `} <span className='hide-sm'>Log-Out</span>
                </a>
            </li>
            <li><Link to="/dashboard" >
                <i className='fas fa-user' />{` `} <span className='hide-sm'>dashboard</span>
                </Link>
            </li>
            
        </ul>
    )

    const guestLink = (
        <ul>    
                <li><Link to="/profiles">Members</Link></li>
                <li><Link to="/regis" >Register</Link></li>
                <li><Link to="/login">Login</Link></li>    
        </ul>
    )

 
   return (

 <nav className="navbar bg-dark">
 <h1>
 <a href="/"><i className="fas fa-code"></i> Remonds App</a>
 </h1>
   { !load && (<Fragment> { isAuth ? authLink : guestLink }</Fragment>)}
 </nav>
 )
};

Navbar.propTypes =  {
    logout : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
    auth : state.auth
})
export default connect(mapStateToProps, {logout})(Navbar);
