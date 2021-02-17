import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux';
import { setID } from 'actions';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import './Register.scss';

const Register = () => {
  	const dispatch = useDispatch();
  	const [displayError, setDisplayError] = useState('');

	const { register, handleSubmit, watch, errors } = useForm();
	const history = useHistory();

  	const onSubmit = data => {
  		// console.log(data);
  		fetch('http://localhost:1337/auth/local/register', {
  		  method: 'post',
  		  headers: {
    		'Content-Type': 'application/json'
  		  },
  		  body: JSON.stringify(data)
		})
		.then((response) => response.json())
		.then((response) => {
			// console.log(response);
			dispatch(setID(response.user.id));
			// console.log(jwt_decode(response.jwt))
			Cookies.set('token', response.jwt);
			history.push("/");
		})
		.catch((error) => setDisplayError('error'));
  	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="Register">
		  <input name="username" type="text" placeholder="username" ref={register({ required: true })} />
		  <input name="email" type="email" placeholder="email" ref={register({ required: true })} />
		  <input name="password" type="password" placeholder="password" ref={register({ required: true })} />
	  	  <input type="submit" />
	  	  <p>error: {displayError}</p>
	    </form>
	);
};

export default Register;
