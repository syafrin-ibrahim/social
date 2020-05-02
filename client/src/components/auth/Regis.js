import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { register} from '../../actions/auth';


function Regis({setAlert, register}){


    const [form, setForm] = useState({
        name : '',
        email : '',
        password : '',
        password2 : ''

    }); 

   
    const { name, email, password, password2} = form
    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        }) 
        console.log(e.target.value);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        //alert('siap menyimpan');
        if(password !== password2){
            setAlert('password did not macth','danger');
        }else{
            register({ name, email, password})
            console.log(form);
        }
    }

    return(
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">sign up</h1>
                <p className="lead">create your acount here</p>
                <form className="form" onSubmit={ handleSubmit}>
                    <div className="form-group">
                    <input type="text" onChange={handleChange} placeholder="Name" name="name" value={name} />
                    </div>
                    <div className="form-group">
                        <input type="email" onChange={handleChange} placeholder="Email Address" name="email" value={email}  />
                        <small className="form-text">This site uses Gravatar so if you want
                        a profile image, use a
                        Gravatar email</small>
                    </div>
                    <div className="form-group">
                        <input type="password" onChange={handleChange} placeholder="Password" name="password" value={password} minLength="6" />
                        </div>
                    <div className="form-group">
                        <input type="password" onChange={handleChange} placeholder="Confirm Password" name="password2" value={password2} minLength="6"/>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />


                </form>
                <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </section>
        </Fragment>
        
    )
}

Regis.propTypes = {
    setAlert : PropTypes.func.isRequired,
    register : PropTypes.func.isRequired
}

export default connect(null,  { setAlert, register })(Regis);