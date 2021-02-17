import React from 'react';
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from 'actions';
import { useHistory } from 'react-router-dom';
import './Register.scss';

const Register = () => {
	const isLogged = useSelector(state => state.isLogged);
  	const dispatch = useDispatch();

	const { register, handleSubmit, watch, errors } = useForm();
	const history = useHistory();
  	const onSubmit = data => {
  		console.log(data);
  		fetch('http://localhost:1337/auth/local/register', {
  		  method: 'post',
  		  headers: {
    		'Content-Type': 'application/json'
  		  },
  		  body: JSON.stringify(data)
		});
		//wait for response (then response, data to JSON)
		//catch errors
		//cookie
		dispatch(logIn());
		history.push("/");
  	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="Register">
		  <input name="username" type="text" placeholder="username" ref={register({ required: true })} />
		  <input name="email" type="email" placeholder="email" ref={register({ required: true })} />
		  <input name="password" type="password" placeholder="password" ref={register({ required: true })} />
	  	  <input type="submit" />
	    </form>
	);
};

export default Register;
