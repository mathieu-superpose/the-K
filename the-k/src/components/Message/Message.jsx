import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import heart from './img/heart.svg'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Message.scss';


const Message = ({ message, loadPosts }) => {
    const id = useSelector(state => state.id);
    const [displayError, setDisplayError] = useState('');
    const history = useHistory();

    const deletePost = () => {
      fetch(`http://localhost:1337/posts/${message.id}`, {
        method: 'delete',
        headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((response) => loadPosts())
    .catch((error) => setDisplayError('Pas authentifié'));
    }


  return (
    <li className='Message'>
    
    	<Link to={`/users/${message.user.id}`}>
    	  <p className='Message__username'>{message.user.username}</p>
		</Link>

    	<p className='Message__text'>{message.text}</p>

    	<div className='Message__heart'>
    	  <img className='Message__heart__img' src={heart} alt='pixelised heart'/>
          <p className='Message__heart__count'>like:{message.like}</p>
          {message.user.id===id ? <p className='Message__heart__delete' onClick={deletePost} >delete</p> : ''}
          <p>{displayError}</p>
    	</div>
    
    </li>
  );
};

export default Message;
