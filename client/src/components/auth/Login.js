import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';

function Login(){
    
    const [form, setForm] = useState({
        
        email : '',
        password : '',
        passord2 : ''

    }); 

   

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        }) 
        console.log(e.target.value);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        alert('siap menyimpan');
    }

    return(
        <Fragment>
        <section className="container">
            <h1 className="large text-primary">sign in</h1>
            <p className="lead"><i className="fa fa-user"></i>sign into your acount</p>
            <form className="form" onSubmit={ handleSubmit}>
                <div className="form-group">

                </div>
                <div className="form-group">
                    <input type="email" onChange={handleChange} placeholder="Email Address" name="email" value={form.email}  required/>
                    <small className="form-text">This site uses Gravatar so if you want
                    a profile image, use a
                    Gravatar email</small>
                </div>
                <div className="form-group">
                    <input type="password" onChange={handleChange} placeholder="Password" name="password" value={form.password} minLength="6" required/>
                    </div>
                
                <input type="submit" className="btn btn-primary" value="Register" />
                <p className="my-1">
                Don't have an account? <Link to="/regis">Sign Up</Link>
                </p>

            </form>
        </section>
    </Fragment>
    )
}

export default Login;