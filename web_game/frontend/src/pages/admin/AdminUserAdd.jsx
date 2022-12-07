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
    points: 0
  });

  const [error, setError] = useState(false)

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
      await axios.post("http://localhost:8800/user/add", user); 
      nav("/admin/user/update"); 
    }
  }

  return (
    <div>
      <AdminNav />
      <div className='content'>
        <form className='updateFormUser' onSubmit={handleClick}>

            <div className='textCenter'>
              <h1>Pridaj Používateľa</h1>
            </div>

            <div className="inputWithLabel">
              <label className={"labelForInput " + (error && user.name.length <=0  ? 'labelForInputDanger' : 'null')}><i><FontAwesomeIcon icon={faUser}/></i> Meno</label>
              <input 
                className={"inputField " + (error && user.name.length <=0  ? 'inputFieldDanger' : 'null')}
                type="text"  
                autoComplete="off" 
                placeholder={error && user.name.length <=0 ? "Používateľ musí mať meno": null }
                onChange={handleChange} 
                name='name'/>
            </div>
            

            <div className="inputWithLabel">
              <label className={"labelForInput " + (error && user.email.length <=0  ? 'labelForInputDanger' : 'null')}><i><FontAwesomeIcon icon={faEnvelope}/></i> Email</label>
              <input 
                className={"inputField " + (error && user.email.length <=0  ? 'inputFieldDanger' : 'null')}
                type="email"  
                autoComplete="off" 
                placeholder={error && user.email.length <=0 ? "Používateľ musí mať email": null }
                onChange={handleChange} 
                name='email'/>
            </div>
            
            <div className="inputWithLabel">
              <label className={"labelForInput " + (error && user.password.length <=0  ? 'labelForInputDanger' : 'null')}><i><FontAwesomeIcon icon={faLock}/></i> Heslo</label>
              <input 
                className={"inputField " + (error && user.password.length <=0  ? 'inputFieldDanger' : 'null')}
                type="text" 
                placeholder={error && user.password.length <=0 ? "Používateľ musí mať heslo": null } 
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

            <button className='buttonForm'>Pridaj Používateľa</button>
        </form>
      </div>
    </div>
  )
}

export default AdminUserAdd;
