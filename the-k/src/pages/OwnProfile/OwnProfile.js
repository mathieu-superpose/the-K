import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import './OwnProfile.scss';

const OwnProfile = () => {
  const hasID = useSelector(state => state);
  const [displayError, setDisplayError] = useState('');
  const { register, handleSubmit, watch, errors } = useForm();

  return (
    <nav className="OwnProfile">
        <p>hello from my own profile again</p>
        <form className="OwnProfile__details">
		  <input name="username" type="text" placeholder="username" ref={register({ required: true })} />
		  <input name="description" type="text" placeholder="description" ref={register({ required: true })} />
	  	  <input type="submit" />
	  	  <p>error: {displayError}</p>
	    </form>
    </nav>
  );
};

export default OwnProfile;
