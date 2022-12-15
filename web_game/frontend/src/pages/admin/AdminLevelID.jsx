import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import AdminNav from '../components/AdminNav';

const AdminLevelID = () => {

  const [level, setLevel] = useState({  
    title: "",
    hint: "",
    picture: "",
    points: null,
    pass: "",
    link: ""
  })

  const location = useLocation(); 
  const nav = useNavigate();
  const id = location.pathname.split("/")[4];

  const handleChange = (e) => {
    setLevel((prev) => ({ ...prev, [e.target.name]: e.target.value }));  
  };


  const handleClick = async (e) => { 
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/level/${id}`, level);
      nav("/admin/level/update");
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
            <h1>Aktualizuj Level</h1>
          </div>
            <input type="text" placeholder='Názov: '  autoCmplete="off" onChange={handleChange} name='title'/>
            <input type="text" placeholder='Pomôcka'  autoComplete="off" onChange={handleChange} name='hint'/>
            <input type="text" placeholder='Fotka: '  autoComplete="off" onChange={handleChange} name='picture'/>
            <input type="text" placeholder='Link: '  autoComplete="off" onChange={handleChange} name='link'/>
            <input type="number" placeholder='Počet bodov: ' autoComplete="off" onChange={handleChange} name='points'/>
            <input type="text" placeholder='Heslo: '  autoComplete="off" onChange={handleChange} name='pass'/>

            <button>Aktualizuj</button>
        </form>
      </div>
    </div>
  )
}

export default AdminLevelID