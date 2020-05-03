import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropsType from 'prop-types';


const Landing = ({isAuth}) => {

        if(isAuth){
                return <Redirect to="/dashboard" />
        }

     return (
  
    <section className="landing">
            <div className="dark-overlay">
            <div className="landing-inner">
            <h1 className="x-large">Remonds App</h1>
            <p className="lead">
            Create Web App with React Express MongoDB and Node <br/> Mediocademy
            </p>
            <div className="buttons">
            <Link to="/regis" className="btn btn-primary">Regis</Link>
            <Link to="/login" className="btn btn-primary">Login</Link>
        
            </div>
            </div>
            </div>
    </section>
    )
   };

   Landing.propsType = {
           isAuth : PropsType.bool
   }

   const mapStateToProps = (state)=>({
           isAuth : state.auth.isAuth
   })
   export default connect(mapStateToProps)(Landing);