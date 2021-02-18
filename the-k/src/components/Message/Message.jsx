import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import './Message.scss';

const Message = ({ message }) => {

  return (
    <li className='Message'>
    	<Link to={`/users/${message.user.id}`}>
    	<p>{message.user.username}</p>
		</Link>
    	<p>{message.text}</p>
    </li>
  );
};

export default Message;
