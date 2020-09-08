import React from 'react';
import Axios from 'axios';
import './App.css';
import {Link} from 'react-router-dom';


class User extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          loggedIn: localStorage.getItem('loggedIn')
        };
    }

    render() {

      const navStyle = {
          color: 'white'
      };
    
      return (
        <nav>
            <ul className="nav-links">
              <Link style={navStyle} to="/">
                <li>Home</li>
              </Link>
              <Link style={navStyle} to="/user">
                <li>Users</li>
              </Link>
              <Link style={navStyle} to="/login">
                  <li>Login</li>
                </Link>
              <Link style={navStyle} to="/logout">
                <li>Logout</li>
              </Link>
              <Link style={navStyle} to="/register">
                <li>Register</li>
              </Link> 
            </ul>
        </nav>
      );
    } 
}

export default User;