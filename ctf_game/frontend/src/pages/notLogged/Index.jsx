import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import Header from '../components/Header';
import config from '../../config/config';

import { faEye, faUser, faLock, faEyeSlash, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Index = () => {
  const nav = useNavigate(); 
  const [loadingIndex, setLoadingIndex] = useState(false);
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user && !loadingIndex) {
      nav("/profile");
    }
  }, [user, nav, loadingIndex]);

  const [eye, setEye] = useState(faEye);
  const [msg, setMsg] = useState({});
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const passToggle = () => {
    let passInput = document.getElementById("passInput");
    if (passInput.type === "password") {
      passInput.type = "text";
      setEye(faEyeSlash);
    } else {
      passInput.type = "password";
      setEye(faEye);
    }
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.apiUrl}/auth`, credentials, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (response.data.message === "ok") {
        setUser(response.data.user);
        setLoadingIndex(true);
        setMsg({});

        setTimeout(() => {
          nav("/Levels");
        }, 2100);

      } else {
        setMsg(response.data);
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };
  
  return (
    <div className='container'>
      <Header />
      <div className='woLogin'>
        <h1>You still don't have an account?</h1>
        <p>Sign up and have fun!</p>
        <Link to="/register">
          <button className='button-49'>Sign up!</button>
        </Link>        
      </div>
      <form className='login' onSubmit={handleClick}>
        <h3 className='typing'>Log in</h3>
        <p>Find various errors in web technologies. Due to the game's type, it is recommended to use a computer/notebook.</p>
        <div className='input'>
          <input 
            className='inputBlueFocus' 
            onChange={handleChange} 
            name="email"
            autoComplete='off'
            type="text" 
            placeholder='Insert your email: '/>
          <label><FontAwesomeIcon icon={faUser}/></label>
        </div>
        <div className='input'>
          <input 
            className='inputBlueFocus' 
            id="passInput" 
            name="password" 
            autoComplete='off'
            onChange={handleChange} 
            type="password" 
            placeholder="Insert your password: "/>
          <label><FontAwesomeIcon icon={faLock}/></label>
          <label id='eye' onClick={passToggle}><FontAwesomeIcon icon={eye}/></label>
        </div>
        {msg.message ? <label className='loginDangerLabel'><FontAwesomeIcon icon={faExclamationCircle}/> {msg.message}</label>: null }
        
        {!loadingIndex ? 
          <button className='signin' type="submit"> Login </button> :
          <p className='loader'></p>
        }
        <div className='mobile'>
          <p>No account?</p>
          <Link to="/register">Sign up here!</Link>
        </div>
      </form>
    </div>
  );
};

export default Index;
