import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link} from 'react-router-dom';
import { makeProfile, getProfile} from '../../actions/profile';
import { STATES } from 'mongoose';

const EditProfile = ({ profile : {profile, load},  makeProfile, getProfile, history})=>{
   const [form, setForm] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
   });

   // Create destructuring
 const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
    } = form;

    //use effect
    useEffect(()=>{
        getProfile();

        setForm({
            company: load || !profile.company ? '' : profile.company,
            website: load || !profile.website ? '' : profile.website,
            location: load || !profile.location ? '' : profile.location,
            status: load || !profile.status ? '' : profile.status,
            skills: load || !profile.skills ? '' : profile.skills.join(','),
            githubusername:
              load || !profile.githubusername ? '' : profile.githubusername,
            bio: load || !profile.bio ? '' : profile.bio,
            twitter: load || !profile.social ? '' : profile.social.twitter,
            facebook: load || !profile.social ? '' : profile.social.facebook,
            linkedin: load || !profile.social ? '' : profile.social.linkedin,
            youtube: load || !profile.social ? '' : profile.social.youtube,
            instagram: load || !profile.social ? '' : profile.social.instagram
          });
    },[load]);

    //state unutk toggle sosmed
    const [togle, setTogle] = useState(false);

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
       // console.log(e.target.value);
    }

    const handleSubmit = (e)=>{
        //alert('ok siap menyimpan');
        e.preventDefault();
        makeProfile(form, history, true);
    }

    return(
        <Fragment>
        <h1 className="large text-primary">
        Create Your Profile
        </h1>
        <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make
       your
        profile stand out
        </p>
        <small>* = required field</small>
        <form className="form" method="post" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
        <select name="status" value={status} onChange={handleChange}>
        <option value="0">* Select Professional Status</option>
        <option value="Developer">Developer</option>
        <option value="Junior Developer">Junior Developer</option>
        <option value="Senior Developer">Senior Developer</option>
        <option value="Project Manager">Project Manager</option>
        <option value="Student">Student or Mahasiswa</option>
        <option value="Instructor">Instructor or Teacher</option>
        <option value="Business Owner">Business Owner/Start
       up</option>
        <option value="Other">Other</option>
        </select>
        <small className="form-text">Give us an idea of where you are at
       in your career</small>
        </div>
        <div className="form-group">
        <input type="text" placeholder="Company" name="company" value={company} onChange={handleChange}/>
        <small className="form-text">Could be your own company or one
       you work for</small>
        </div>
        <div className="form-group">
        <input type="text" placeholder="Website" name="website" value={website} onChange={handleChange} />
        <small className="form-text">Could be your own or a company
       website</small>
        </div>
        <div className="form-group">
        <input type="text" placeholder="Location" name="location" value={location} onChange={handleChange} />
        <small className="form-text">City & state suggested (eg. Boston,
       MA)</small>
        </div>
        <div className="form-group">
        <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={handleChange} />
        <small className="form-text">Please use comma separated values
       (eg.
        HTML,CSS,JavaScript,PHP)</small>
        </div>
        <div className="form-group">
        <input type="text" placeholder="Github Username"
       name="githubusername" value={githubusername} onChange={handleChange} />
        <small className="form-text">If you want your latest repos and a
       Github link, include your
        username</small>
        </div>
        <div className="form-group">
        <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={handleChange}>{bio}
       </textarea>
        <small class="form-text">Tell us a little about yourself</small>
        </div>
        <div className="my-2">
        <button type="button" onClick={()=> {setTogle(!togle)}} className="btn btn-light">
        Add Social Network Links
        </button>
        <span>Optional</span>
        </div>
        {/* //kondisional rendering */}

        { togle && <Fragment>
                <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={handleChange}/>
                </div>
                <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={handleChange}/>
                </div>
                <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={handleChange} />
                </div>
                <div className="form-group social-input">
                    <i className="fab fa-linkedin fa-2x"></i>
                    <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={handleChange} />
                </div>
                <div className="form-group social-input">
                    <i className="fab fa-instagram fa-2x"></i>
                <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={handleChange} />
                    </div>
                
        </Fragment>}
        <input type="submit" class="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go
       Back</Link>
        </form>
        </Fragment>
       
    )
}

EditProfile.propTypes = {
    makeProfile : PropTypes.func.isRequired,
    getProfile : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile : state.profile
});

export default connect(mapStateToProps, { makeProfile, getProfile})(withRouter(EditProfile));