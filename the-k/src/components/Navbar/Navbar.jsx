import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.scss';
import logo from 'img/the_k_logo.svg';

const Navbar = () => {
  const name = useSelector(state => state.name);

  return (
    <nav className="Navbar">
        <Link to="/">
          <img src={logo} alt='the k logo' />
        </Link>
        {name==='' ? <Link to="/login"><p>Login</p></Link> :  <Link to="/users/me"><p>{name}</p></Link>}
    </nav>
  );
};

export default Navbar;
