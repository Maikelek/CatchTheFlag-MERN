import axios from 'axios'; 
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AdminNav from '../components/AdminNav';

import { faUser, faLock, faEnvelope, faCoins, faExclamationCircle, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
const AdminUserAdd = () => {


  const [user, setUser] = useState({ 
    name: "",
    email: "",
    password: "",
    points: 0,
    role: "hrac"
  });

  const [error, setError] = useState(false)
  const [msg, setMsg] = useState({});

  const nav = useNavigate(); 

  const handleChange = (e) => {
    setUser(prev => ({...prev, [e.target.name]: e.target.value}));  
  };

  const handleClick = async e => {   
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8800/admin/user`, user);
      if (response.data) {
        setMsg(response.data)
        console.log(response.data)
      }
    } 
    
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <AdminNav />
      <div className='content'>
        <form className='updateForm' onSubmit={handleClick}>

            <div className='textCenter'>
              <h1>Pridaj Používateľa</h1>
            </div>

            <div className="inputWithLabel">
              <label className="labelForInput "><i><FontAwesomeIcon icon={faUser}/></i> Meno</label>
              <input 
                type="text"  
                autoComplete="off" 
                onChange={handleChange} 
                name='name'/>
            </div>
            

            <div className="inputWithLabel">
              <label className="labelForInput "><i><FontAwesomeIcon icon={faEnvelope}/></i> Email</label>
              <input 
                type="email"  
                autoComplete="off" 
                onChange={handleChange} 
                name='email'/>
            </div>
            
            <div className="inputWithLabel">
              <label className="labelForInput"><i><FontAwesomeIcon icon={faLock}/></i> Heslo</label>
              <input 
                type="password" 
                onChange={handleChange} 
                name='password'/>
            </div>
            

            <div className="inputWithLabel">
              <label className="labelForInput"><i><FontAwesomeIcon icon={faCoins}/></i> Body</label>
              <input 
                type="number"  
                autoComplete="off" 
                onChange={handleChange} 
                name='points'/>
            </div>

            <div className="inputWithLabelRow">
              <label className="labelForInput"><i><FontAwesomeIcon icon={faCoins}/></i> Hráč</label>
              <input 
                type="radio"  
                onChange={handleChange} 
                name='role'
                checked
                value="hrac"/>

              <label className="labelForInput"><i><FontAwesomeIcon icon={faCoins}/></i> Admin</label>
              <input 
                type="radio"  
                onChange={handleChange} 
                name='role'
                value="admin"/>
            </div>


            <button className='buttonForm'>Pridaj Používateľa</button>
            {msg.message ? <h5 className='loginDangerLabel'><FontAwesomeIcon icon={faExclamationCircle}/> {msg.message}</h5>: null }
            {msg.messageGreen ? <h5 className="loginSucessLabel"><FontAwesomeIcon icon={faThumbsUp}/> {msg.messageGreen}</h5> : null }
        </form>
      </div>
    </div>
  )
}

export default AdminUserAdd;
