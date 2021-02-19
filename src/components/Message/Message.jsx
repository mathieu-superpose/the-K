import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import heart from './img/heart.svg';
import bin from './img/bin.svg'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { url } from 'url/url.json';
import Cookies from 'js-cookie';
import './Message.scss';


const Message = ({ message, loadPosts }) => {
    const id = useSelector(state => state.id);
    const [displayError, setDisplayError] = useState('');
    const history = useHistory();
    const [liked, setLiked] = useState(false);

    const checkAuth = id === '' ? false : true;

    const deletePost = () => {
      fetch(`${url}posts/${message.id}`, {
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

    const updateLike = () => {
    const data = {
      like: message.like
    }

    liked === false ? data.like += 1 : data.like -= 1;

    fetch(`${url}posts/${message.id}`, {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`, 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((response) => {
        setLiked(!liked)
        loadPosts()
    })
    .catch((error) => setDisplayError('Pas authentifié'));
  }


  return (
    <li className='Message'>
        
        {checkAuth && 
    	<Link to={`/users/${message.user.id}`}>
    	  <p className='Message__username'>{message.user.username}</p>
		</Link>
        }

    	<p className='Message__text'>{message.text}</p>

        {checkAuth &&
    	<div className='Message__right'>
        {message.user.id===id ? <img className='Message__right__bin' src={bin} onClick={deletePost} /> : ''}
    	  <img className='Message__right__heart' src={heart} alt='pixelised heart' onClick={updateLike} />
        <p className='Message__right__count'>{message.like>0 ? message.like : '\xa0\xa0'}</p>
        <p>{displayError}</p>
    	</div>
        }
    
    </li>
  );
};

export default Message;
