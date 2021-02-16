import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {

  return (
    <nav className="Navbar">
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/register">
          <p>Register</p>
        </Link>
        <Link to="/login">
          <p>Login</p>
        </Link>
    </nav>
  );
};

export default Navbar;
