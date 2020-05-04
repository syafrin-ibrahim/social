import React, { Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';
import { Link, withRouter} from 'react-router-dom';
import { addExperience } from '../../actions/profile'

const AddExperience = ({addExperience, history})=>{
    const [form, setForm] = useState({
        company : '',
        title : '',
        location : '',
        from : '',  
        to : '',
        current : false,
        description : ''
    });

    /// set state disable to 
    const [disabled, setEnable] = useState(false);

    //destructure 
    const { title, company,  location , from, to , current , description }= form;

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
        console.log(e.target.value);
    }

    const handleSubmit = (e)=>{
        //alert('ok siap menyimpan');
        e.preventDefault();
         addExperience(form, history);
      
    }

    return (
        <Fragment>
        <h1 className="large text-primary">
        Add An Experience
        </h1>
        <p className="lead">
        <i className="fas fa-code-branch"></i> Tambahkan pengalaman kerja anda
       yang lain jika ada.
        </p>
        <small>* = required field</small>
       
       
        <form className="form" autocomplete="off" onSubmit={handleSubmit}>
        <div className="form-group">
        <input type="text" placeholder="* Job Title" name="title" value={title} onChange={handleChange} required />
        </div>
        <div className="form-group">
        <input type="text" placeholder="* Company" name="company" value=
       {company} onChange={handleChange} required />
        </div>
        <div className="form-group">
        <input type="text" placeholder="Location" name="location" value={location} onChange={ handleChange}/>
        </div>
        <div className="form-group">
        <h4>From Date</h4>
        <input type="date" name="from" value={from} onChange={handleChange} />
        </div>
              
        <div className="form-group">
        <p><input type="checkbox" name="current" checked={current} value={current}  onChange= { (e)=>{
        setForm({ ...form, current: !current });
        setEnable(!disabled);
            }
        }
        /> {' '}Current Job</p>
         </div>
        <div className="form-group">
        <h4>To Date</h4>
        <input type="date" name="to"  value={to} onChange={handleChange}  disabled={disabled ? 'disabled' : ''}
        />
        </div>
       
        <div className="form-group">
        <textarea name="description" cols="30" rows="5" placeholder="Job
       Description" value={description} onChange={ handleChange}></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go
       Back</Link>
        </form> 
      
        </Fragment>

    )

}

AddExperience.propTypes = {
addExperience : PropTypes.func.isRequired
}


export default connect(null, {addExperience})(withRouter(AddExperience));