import React, { Fragment, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Regis from './components/auth/Regis';
import Login from './components/auth/Login';

import { Provider} from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import  {loadUser} from './actions/auth';
import  setAuthToken  from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import  CreateProfile  from "./components/profile-forms/CreateProfile";
import  EditProfile  from "./components/profile-forms/EditProfile";
import PrivateRoute from './components/routing/PrivateRoute';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/post/Posts';

// cek apakh token tersedia
if(localStorage.token){
    setAuthToken(localStorage.token);
}

function App() {

  
  useEffect(()=>{
    store.dispatch(loadUser());
  },[])



  return (
    <Provider store={store}>
    <Router>
    <Fragment>
      <Navbar />
      <section className="container">
        <Alert/>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/regis" component={Regis}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/profiles" component={Profiles}/>
          <PrivateRoute exact path="/posts" component={Posts}/>
          <PrivateRoute exact path="/profile/:id" component={Profile}/>
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
          <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
          <PrivateRoute exact path="/add-experience" component={AddExperience}/>
          <PrivateRoute exact path="/add-education" component={AddEducation}/>


        </Switch>
      </section>
    </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
