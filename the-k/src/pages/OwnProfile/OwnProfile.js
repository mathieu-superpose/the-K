import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import './OwnProfile.scss';

const OwnProfile = () => {
  const hasID = useSelector(state => state);
  const [displayError, setDisplayError] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { register, handleSubmit, watch, errors } = useForm();

  const loadProfile = () => {
  		fetch(`http://localhost:1337/users/${hasID}`, {
  		  method: 'get',
  		  headers: {
    		'Authorization': `Bearer ${Cookies.get('token')}`,
    		'Content-Type': 'application/json'
  		  }
		})
		.then((response) => response.json())
		.then((response) => {
			console.log(response)
			setName(response.username)
			setDescription(response.description)
		})
		.catch((error) => console.log(error));
  	}

  	useEffect(() => {
    loadProfile();
  	}, [])

  return (
    <nav className="OwnProfile">
        <p>hello from my own profile again</p>
        <form className="OwnProfile__details">
		  <input name="username" type="text" placeholder="username" value={name} ref={register({ required: true })} />
		  <input name="description" type="text" placeholder="description" value={description} ref={register({ required: true })} />
	  	  <input type="submit" />
	  	  <p>error: {displayError}</p>
	    </form>
    </nav>
  );
};

export default OwnProfile;
