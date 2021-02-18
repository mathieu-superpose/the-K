import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { setName } from 'actions';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import './OwnProfile.scss';

const OwnProfile = () => {
	const id = useSelector(state => state.id);
	const [displayError, setDisplayError] = useState('');
	const [username, setUsername] = useState('');
	const [description, setDescription] = useState('');
	const { register, handleSubmit, watch, errors } = useForm();
	const dispatch = useDispatch();

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
			setUsername(response.username)
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
			console.log(response);
			setUsername(response.username);
			setDescription(response.description);
			dispatch(setName(response.username));
			history.push("/");
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
		  <input name="username" type="text" defaultValue={username} ref={register({ required: true })} />
		  <input name="description" type="text" defaultValue={description} ref={register({ required: true })} />
	  	  <input type="submit" />
	  	  <p>{displayError}</p>
	    </form>
    </nav>
  );
};

export default OwnProfile;
