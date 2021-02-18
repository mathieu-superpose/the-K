import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux';
import { setID } from 'actions';
import { useHistory } from 'react-router-dom';
import { url } from 'url/url.json';
import jwt_decode from "jwt-decode";
import './Register.scss';

const Register = () => {
  	const dispatch = useDispatch();
  	const [displayError, setDisplayError] = useState('');

	const { register, handleSubmit, watch, errors } = useForm();
	const history = useHistory();

  	const onSubmit = data => {
  		fetch(`${url}auth/local/register`, {
  		  method: 'post',
  		  headers: {
    		'Content-Type': 'application/json'
  		  },
  		  body: JSON.stringify(data)
		})
		.then((response) => response.json())
		.then((response) => {
			dispatch(setID(response.user.id));
			Cookies.set('token', response.jwt);
			history.push("/");
		})
		.catch((error) => setDisplayError('Email déjà utilisé'));
  	}

	return (
		<div className="Register">
		<h2>nouveau compte</h2>
		  <form className="Register__form" onSubmit={handleSubmit(onSubmit)}>
		    <input className="Register__form__username" name="username" type="text" placeholder="username" ref={register({ required: true })} />
		    <input className="Register__form__email" name="email" type="email" placeholder="email" ref={register({ required: true })} />
		    <input className="Register__form__password" name="password" type="password" placeholder="password" ref={register({ required: true })} />
	  	    <input className="Register__form__button" type="submit" />
	  	    <p className="Register__form__error">{displayError}</p>
	      </form>
	    </div>
	);
};

export default Register;
