import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Message from 'components/Message/Message';
import { useForm } from "react-hook-form";
import './Home.scss';

const Home = () => {
  	const [displayError, setDisplayError] = useState('');
  	const [messages, setMessages] = useState('');
    const { register, handleSubmit, watch, errors } = useForm();
    const id = useSelector(state => state.id);

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

    const createPost = data => {
      fetch('http://localhost:1337/posts', {
        method: 'post',
        headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((response) => setMessages([...messages , response]))
    .catch((error) => setDisplayError('Pas authentifié'));
    }

  	useEffect(() => {
    loadPosts();
  	}, [messages])

	return (
		<div className="Home">
    		{!id &&
          <p>Welcome on My Social Network. This website is a training to Redux and React. We use auth and routing to create a small social media website.</p>
        }
        
        {id && 
        <div className='Post'>
          <h2 className='Post__title'>Poster un nouveau message</h2>
          <form onSubmit={handleSubmit(createPost)} className='Post__form'>
            <input name="user" type="hidden" value={id} ref={register({ required: true })} />
            <input className='Post__form__text' name="text" type="text" placeholder="nouveau message" ref={register({ required: true, maxLength: 140 })} />
            <input className='Post__form__button' type="submit" />
            <p className='Post__form__error'>{displayError}</p>
          </form>
        </div>
        }

      	<ul className='Home__messages'>
      	{messages && messages.map((message) => (
      		<Message message={message} key={message.id}/>
      	)).reverse()}
      	</ul>
        <p>{displayError}</p>
    </div>
	);
};

export default Home;
