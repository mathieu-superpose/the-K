import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Post from 'components/Post/Post';
import Message from 'components/Message/Message';
import './Home.scss';

const Home = () => {
  	const [displayError, setDisplayError] = useState('');
  	const [messages, setMessages] = useState('');
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
    .then((response) => setMessages([...messages, response]))
    .catch((error) => setDisplayError('Pas authentifié'));
    }

  	useEffect(() => {
    loadPosts();
  	}, [])

	return (
		<div className="Home">
    		{!id &&
          <p>Welcome on My Social Network. This website is a training to Redux and React. We use auth and routing to create a small social media website.</p>
        }

        {id && 
        <Post createPost={createPost} id={id} displayError={displayError}/>
        }

      	<ul className='Home__messages'>
      	{messages && messages.map((message) => (
      		<Message message={message} key={message.id} loadPosts={loadPosts}/>
      	)).reverse()}
      	</ul>
        <p>{displayError}</p>
    </div>
	);
};

export default Home;
