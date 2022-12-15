import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import AdminNav from '../components/AdminNav';

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
        <form onSubmit={handleClick} className='updateForm'>
          <div className='textCenter'>
            <h1>Aktualizuj používateľa
            </h1>
          </div>
            <input type="text" placeholder='Meno:'  autoComplete="off" onChange={handleChange} name='name'/>
            <input type="text" placeholder='Email:'  autoComplete="off" onChange={handleChange} name='email'/>
            <input type="text" placeholder='Heslo: '  autoComplete="off" onChange={handleChange} name='password'/>
            <input type="number" placeholder='Počet bodov: ' autoComplete="off" onChange={handleChange} name='points'/>

           <button>Aktualizuj</button>
        </form>
      </div>
    </div>
  )
}

export default AdminUserID