import React, { Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';
import { Link, withRouter} from 'react-router-dom';
import { addEducation } from '../../actions/profile'

const AddEducation = ({addEducation, history})=>{
    const [form, setForm] = useState({
     
            school: '',
            degree: '',
            fieldofstudy: '',
            from : '',
            to: '',
            current: false,
            description: ''
           
    });

    /// set state disable to 
    const [toDateDisabled, toggleDisabled] = useState(false);


    //destructure 
    const {  school, degree, fieldofstudy,from, to, current, description }= form;

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
         addEducation(form, history);
      
    }

    return (
        <Fragment>
                <h1 class="large text-primary">
                Add Your Education
                </h1>
                <p class="lead">
                <i class="fas fa-code-branch"></i> Tambahkan pendidikan anda dan
                bootcamp yang lain jika ada.
                </p>
                <small>* = required field</small>


                <form className="form" autocomplete="off" onSubmit={e => {
                e.preventDefault();
                addEducation(form, history);
                }}>
                <div className="form-group">
                <input type="text"
                placeholder="* School"
                name="school"
                value={school}
                onChange={handleChange}
                required />
                </div>
                <div className="form-group">
                <input
                type="text"
                placeholder="* Degree atau Kursus"
                name="degree"
                value={degree}
                onChange={handleChange}
                required
                />
                </div>
                <div className="form-group">
                <input
                type="text"
                placeholder="Field of Study atau Jurusan"
                name="fieldofstudy"
                value={fieldofstudy}
                onChange={handleChange}
                />
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from"  value={from}  onChange={handleChange} />
                </div>

                
                <div className="form-group">
                <p><input
                type="checkbox"
                name="current"
                value={current}
                onChange={e => {
                setForm({ ...form, current: !current });
                toggleDisabled(!toDateDisabled);
                }}
                /> {' '}Current Education</p>
              
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" value={to}
                onChange={handleChange}
                disabled={toDateDisabled ? 'disabled' : ''}
                />
                </div>

                <div className="form-group">
                <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Program Description"
                value={description}
                onChange={handleChange}
                />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go
                Back</Link>;
                >
                </form> 
      
        </Fragment>

    )

}

AddEducation.propTypes = {
addEducation : PropTypes.func.isRequired
}


export default connect(null, {addEducation})(withRouter(AddEducation));