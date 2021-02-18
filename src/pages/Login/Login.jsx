import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux';
import { setID, setName } from 'actions';
import { useHistory } from 'react-router-dom';
import { url } from 'url/url.json';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  	const dispatch = useDispatch();
  	const [displayError, setDisplayError] = useState('');
	const { register, handleSubmit, watch, errors } = useForm();
	const history = useHistory();
  	const onSubmit = data => {
  		fetch(`${url}auth/local`, {
  		  method: 'post',
  		  headers: {
    		'Content-Type': 'application/json'
  		  },
  		  body: JSON.stringify(data)
		})
		.then((response) => response.json())
		.then((response) => {
			dispatch(setID(response.user.id));
			dispatch(setName(response.user.username));
			Cookies.set('token', response.jwt);
			history.push("/");
		})
		.catch((error) => setDisplayError('Mauvais identifiant / password'));
  	}

	return (
		<nav className='Login'>
		  <h2>s'identifer</h2>
		  <div className='Login__card'>
		    <form className='Login__card__form' onSubmit={handleSubmit(onSubmit)} className="Register">
		      <input className='Login__card__form__email' name="identifier" type="email" placeholder="email" ref={register({ required: true })} />
		      <input className='Login__card__form__password' name="password" type="password" placeholder="password" ref={register({ required: true })} />
	  	      <input className='Login__card__form__button' type="submit" value="connection"/>
	  	      <p>{displayError}</p>
	  	      <Link to="/register">
          	    <p>nouveau compte</p>
        	  </Link>
	        </form>
	      </div>
	    </nav>
	);
};

export default Login;
