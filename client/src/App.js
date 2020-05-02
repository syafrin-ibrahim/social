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

        </Switch>
      </section>
    </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
