import React from 'react';
import {Link} from 'react-router-dom';
const Navbar = () => {
 return (

 <nav className="navbar bg-dark">
 <h1>
 <a href="index.html"><i className="fas fa-code"></i> Remonds App</a>
 </h1>
 <ul>
 <li><a href="profiles.html">Members</a></li>
 <li><Link to="/regis" >Register</Link></li>
 <li><Link to="/login">Login</Link></li>
 </ul>
 </nav>
 )
};
export default Navbar;
