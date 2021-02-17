import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import './OwnProfile.scss';

const OwnProfile = () => {
	const id = useSelector(state => state.id);
	const [displayError, setDisplayError] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const { register, handleSubmit, watch, errors } = useForm();

	const history = useHistory();

  	const loadProfile = () => {
  		fetch(`http://localhost:1337/users/${id}`, {
  		  method: 'get',
  		  headers: {
    		'Authorization': `Bearer ${Cookies.get('token')}`,
    		'Content-Type': 'application/json'
  		  }
		})
		.then((response) => response.json())
		.then((response) => {
			setName(response.username)
			setDescription(response.description)
		})
		.catch((error) => setDisplayError('Erreur en cours...'));
  	}

  	const updateProfile = data => {
  		fetch(`http://localhost:1337/users/${id}`, {
  		  method: 'put',
  		  headers: {
    		'Authorization': `Bearer ${Cookies.get('token')}`,
    		'Content-Type': 'application/json'
  		  },
  		  body: JSON.stringify(data)
		})
		.then((response) => response.json())
		.then((response) => {
			setName(response.username)
			setDescription(response.description)
			history.push("/users/me");
		})
		.catch((error) => console.log(error));
  	}

  	useEffect(() => {
    loadProfile();
  	}, [])

  return (
    <nav className="OwnProfile">
        <p>hello from my own profile again</p>
        <form className="OwnProfile__details" onSubmit={handleSubmit(updateProfile)}>
		  <input name="username" type="text" placeholder={name} ref={register({ required: true })} />
		  <input name="description" type="text" placeholder={description} ref={register({ required: true })} />
	  	  <input type="submit" />
	  	  <p>error: {displayError}</p>
	    </form>
    </nav>
  );
};

export default OwnProfile;
