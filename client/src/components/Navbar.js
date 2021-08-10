import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import './Navbar.css'

class Navbar extends Component {

  logOut = (e)=>{
    e.preventDefault();
     try {
      localStorage.removeItem("token");
      this.props.setAuth(false);
      toast.success("Logged Out Successfully");
     } catch (error) {
       console.error(error.message);
     }
      
   }
  render() {
    return (
      <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo'>Book Recommendation</Link>
          <ul className='nav-menu'>
            <li className='nav-item'>
              <Link to='/' className='nav-links'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link to='/search' className='nav-links'>Search</Link>
            </li>
            <li className='nav-item'>
              <Link to='/userProfile' className='nav-links'>User Page</Link>
            </li>
            <li className='nav-item'>
              {this.props.auth? <Link to = '/login' onClick ={this.logOut} className='nav-links'>Log Out</Link> : <Link to='/login' className='nav-links'>Log In</Link>}
            </li>
          </ul>
        </div>
      </nav>
      </>
    );
  }
}

export default Navbar;
