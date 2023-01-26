import axios from 'axios'; 
import React from 'react';
import { useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import AdminNav from '../components/AdminNav';

import { faUser, faLock, faEnvelope, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 

const AdminUserID = () => {  
  const [user, setUser] = useState({  
    name: '',
    email: '',
    password: '',
    points: '',
    role: ''
  })

  const [msg, setMsg] = useState({});

  const location = useLocation(); 
  const id = location.pathname.split("/")[4];

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));  
  };

  useEffect( () => {                
    const fetchAllData = async () => {
        try{
            const res = await axios.get(`http://localhost:8800/admin/user/${id}`)
            setUser(res.data[0]);
            console.log(user)
        }catch(error) {
            console.log(error);
        }
    }
    fetchAllData()
  },[id])


  const handleClick = async (e) => { 
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8800/admin/user/${id}`, user);
      if (response.data) {
        setMsg(response.data)
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(user)

  return (
    <div>
      <AdminNav />
      <div className='content'>
        <form className='updateForm' onSubmit={handleClick}>

            <div className='textCenter'>
              <h1>Aktualizuj Používateľa: {user.name}</h1>
            </div>

            <div className="inputWithLabel">
              <label className="labelForInput"><i><FontAwesomeIcon icon={faUser}/></i> Meno</label>
              <input 
                type="text"  
                autoComplete="off" 
                onChange={(e) => {
                  setUser({...user, name: e.target.value})
                }}
                name='name'
                value={user.name}/>
            </div>
            

            <div className="inputWithLabel">
              <label className="labelForInput"><i><FontAwesomeIcon icon={faEnvelope}/></i> Email</label>
              <input 
                type="email"  
                autoComplete="off" 
                onChange={(e) => {
                  setUser({...user, email: e.target.value})
                }}
                name='email'
                value={user.email}/>
            </div>
            
            <div className="inputWithLabel">
              <label className="labelForInput"><i><FontAwesomeIcon icon={faLock}/></i> Heslo</label>
              <input 
                type="text" 
                onChange={(e) => {
                  setUser({...user, password: e.target.value})
                }} 
                name='password'
                placeholder='********'
                />
            </div>
            

            <div className="inputWithLabel">
              <label className="labelForInput"><i><FontAwesomeIcon icon={faCoins}/></i> Body</label>
              <input 
                type="number"  
                autoComplete="off" 
                onChange={(e) => {
                  setUser({...user, points: e.target.value})
                }}
                name='points'
                value={user.points}/>
            </div>

            <div className="inputWithLabelRow">
              <label className="labelForInput"><i><FontAwesomeIcon icon={faCoins}/></i> Hráč</label>
              <input 
                type='radio'  
                onChange={handleChange} 
                name='role'
                value='hrac'
                checked={user.role === "hrac" ? true : false}
                />

              <label className="labelForInput"><i><FontAwesomeIcon icon={faCoins}/></i> Admin</label>
              <input 
                type="radio"  
                onChange={handleChange} 
                name='role'
                value="admin"
                checked={user.role === "admin" ? true : false}/>
            </div>

            <button className='buttonForm'>Aktualizuj Používateľa</button>
        </form>
      </div>
    </div>
  )
}

export default AdminUserID