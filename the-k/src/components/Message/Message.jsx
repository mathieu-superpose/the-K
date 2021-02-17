import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import './Message.scss';

const Message = ({ message }) => {

  return (
    <li className='Message'>
    	<p>{message.user.username}</p>
    	<p>{message.text}</p>
    </li>
  );
};

export default Message;
