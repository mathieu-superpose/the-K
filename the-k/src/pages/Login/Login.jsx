import React from 'react';
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux';
import { setID } from 'actions';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import './Login.scss';

const Login = () => {
	const isLogged = useSelector(state => state.isLogged);
  	const dispatch = useDispatch();

	const { register, handleSubmit, watch, errors } = useForm();
	const history = useHistory();
  	const onSubmit = data => {
  		console.log(data);
  		fetch('http://localhost:1337/auth/local', {
  		  method: 'post',
  		  headers: {
    		'Content-Type': 'application/json'
  		  },
  		  body: JSON.stringify(data)
		})
		.then((response) => response.json())
		.then((response) => {
			console.log(response);
			dispatch(setID(response.user.id));
			console.log(jwt_decode(response.jwt))
			Cookies.set('token', response.jwt);
			history.push("/");
		})
		//wait for response (then response, data to JSON)
		//catch errors
		//cookie
		
  	}

	return (
		<div className='Login'>
		  <form onSubmit={handleSubmit(onSubmit)} className="Register">
		    <input name="identifier" type="email" placeholder="email" ref={register({ required: true })} />
		    <input name="password" type="password" placeholder="password" ref={register({ required: true })} />
	  	    <input type="submit" />
	  	    <Link to="/register">
          	  <p>Register</p>
        	</Link>
	      </form>

	    </div>
	);
};

export default Login;
