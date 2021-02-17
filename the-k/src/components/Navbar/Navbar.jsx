import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Navbar.scss';
import logo from 'img/the_k_logo.svg';

const Navbar = () => {
  const hasID = useSelector(state => state);

  return (
    <nav className="Navbar">
        <Link to="/">
          <img src={logo} alt='the k logo' />
        </Link>
        {hasID==='' ? <Link to="/login"><p>Login</p></Link> :  <Link to="/profile"><p>ID: {hasID}</p></Link>}
    </nav>
  );
};

export default Navbar;
