import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";
import Message from 'components/Message/Message'
import './Home.scss';

const Home = () => {
  	const [displayError, setDisplayError] = useState('');
  	const [messages, setMessages] = useState('');

  	const loadPosts = data => {
  		fetch('http://localhost:1337/posts', {
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
    loadPosts();
  	}, [])

	return (
		<nav className="Home">
    		<p>Welcome on My Social Network. This website is a training to Redux and React. We use auth and routing to create a small social media website.</p>
        <p>{displayError}</p>
      	<ul className='Home__messages'>
      	{messages && messages.map((message) => (
      		<Message message={message}/>
      	))}
      	</ul>
    </nav>
	);
};

export default Home;
