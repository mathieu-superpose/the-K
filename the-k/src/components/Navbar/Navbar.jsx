import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import logo from 'img/the_k_logo.svg';

const Navbar = () => {

  return (
    <nav className="Navbar">
        <Link to="/">
          <img src={logo} alt='the k logo' />
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
