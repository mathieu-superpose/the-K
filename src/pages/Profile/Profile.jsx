import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Message from 'components/Message/Message';
import './Profile.scss';

const Profile = ({ match }) => {
	const id = match.url.match(/\d+/g);
	const [username, setUsername] = useState('');
	const [description, setDescription] = useState('');
	const [displayError, setDisplayError] = useState('');
  const [messages, setMessages] = useState('');

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

  const loadPosts = data => {
      fetch(`http://localhost:1337/posts?user.id=${id}`, {
        method: 'get',
        headers: {
        'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((response) => setMessages(response))
    .catch((error) => setDisplayError('Pas authentifié'));
    }

  	useEffect(() => {
    loadProfile();
    loadPosts();
  	}, [])

  return (
    <nav className="Profile">
        <p>{username}</p>
        <p>{description}</p>
        <p>{displayError}</p>
        <ul className='Home__messages'>
        {messages && messages.map((message) => (
          <Message message={message} key={message.id} loadPosts={loadPosts}/>
        )).reverse()}
        </ul>
    </nav>
  );
};

export default Profile;
