import axios from 'axios'; 
import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import AdminNav from '../components/AdminNav';

import { faUser, faLock, faEnvelope, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 

const AdminUserID = () => {  
  const [user, setUser] = useState({  
    name: "",
    email: "",
    password: "",
    points: null,
  })

  const location = useLocation(); 
  const nav = useNavigate();
  const id = location.pathname.split("/")[4];

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));  
  };


  const handleClick = async (e) => { 
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/user/${id}`, user);
      nav("/admin/user/update");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AdminNav />
      <div className='content'>
        <form className='updateForm' onSubmit={handleClick}>

            <div className='textCenter'>
              <h1>Aktualizuj Používateľa</h1>
            </div>

            <div className="inputWithLabel">
              <label className="labelForInput"><i><FontAwesomeIcon icon={faUser}/></i> Meno</label>
              <input 
                className="inputField"
                type="text"  
                autoComplete="off" 
                onChange={handleChange} 
                name='name'/>
            </div>
            

            <div className="inputWithLabel">
              <label className="labelForInput"><i><FontAwesomeIcon icon={faEnvelope}/></i> Email</label>
              <input 
                className="inputField"
                type="email"  
                autoComplete="off" 
                onChange={handleChange} 
                name='email'/>
            </div>
            
            <div className="inputWithLabel">
              <label className="labelForInput"><i><FontAwesomeIcon icon={faLock}/></i> Heslo</label>
              <input 
                className="inputField"
                type="text" 
                onChange={handleChange} 
                name='password'/>
            </div>
            

            <div className="inputWithLabel">
              <label className="labelForInput"><i><FontAwesomeIcon icon={faCoins}/></i> Body</label>
              <input 
                className='inputField' 
                type="number"  
                autoComplete="off" 
                onChange={handleChange} 
                name='points'/>
            </div>

            <button className='buttonForm'>Aktualizuj Používateľa</button>
        </form>
      </div>
    </div>
  )
}

export default AdminUserID