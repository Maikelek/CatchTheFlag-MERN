import axios from 'axios'; 
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AdminNav from '../components/AdminNav';

import { faUser, faLock, faEnvelope, faCoins } from "@fortawesome/free-solid-svg-icons";
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
    
    if (user.name.length <= 0) {
      setError(true)
    }
    if (user.email.length <= 0) {
      setError(true)
    }
    if (user.password.length <= 0) {
      setError(true)
    }

    if (user.name && user.email && user.password ){
      await axios.post("http://localhost:8800/admin/user", user); 
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
        </form>
      </div>
    </div>
  )
}

export default AdminUserAdd;
