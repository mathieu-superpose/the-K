import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { setName } from 'actions';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { url } from 'url/url.json';
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
  		fetch(`${url}users/${id}`, {
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
  		fetch(`${url}users/${id}`, {
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
    	<div className="OwnProfile__card">
        <h2>Mise à jour de mon profil</h2>
        <form className="OwnProfile__card__details" onSubmit={handleSubmit(updateProfile)}>
          <label className="OwnProfile__card__details__label">username</label>
		  <input className="OwnProfile__card__details__username" name="username" type="text" defaultValue={username} ref={register({ required: true })} />
		  <label className="OwnProfile__card__details__label">description</label>
		  <input className="OwnProfile__card__details__description" name="description" type="text" defaultValue={description} ref={register({ required: true })} />
	  	  <input className="OwnProfile__card__details__button" type="submit" value="Mettre à jour"/>
	  	  <p>{displayError}</p>
	    </form>
	    </div>
    </nav>
  );
};

export default OwnProfile;
