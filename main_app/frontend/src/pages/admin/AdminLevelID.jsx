import axios from 'axios'; 
import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import AdminNav from '../components/AdminNav';

import { faAddressCard, faLock, faCoins, faComments, faCamera, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

          <div className="inputWithLabel">  
            <label className="labelForInput"><i><FontAwesomeIcon icon={faAddressCard}/></i> Nazov Levelu</label>
            <input 
              className="inputField" 
              type="text"  
              autoComplete="off" 
              onChange={handleChange} 
              name='title'/>
          </div>

          <div className="inputWithLabel">  
            <label className="labelForInput"><i><FontAwesomeIcon icon={faComments}/></i> Pomôcka</label>
            <input 
              className="inputField"
              type="text"  
              autoComplete="off" 
              onChange={handleChange} 
              name='hint'/>
          </div>

          <div className="inputWithLabel">  
            <label className="labelForInput"><i><FontAwesomeIcon icon={faCoins}/></i> Body</label>
            <input 
              className="inputField"
              type="number"  
              autoComplete="off" 
              onChange={handleChange} 
              name='points'/>
          </div>

          <div className="inputWithLabel">  
            <label className="labelForInput "><i><FontAwesomeIcon icon={faCamera} /></i> Fotka</label>
            <input 
              className="inputField"
              type="text"  
              autoComplete="off" 
              placeholder="Nevyžaduje sa"
              onChange={handleChange} 
              name='picture'/>
          </div>

          <div className="inputWithLabel">  
            <label className="labelForInput"><i><FontAwesomeIcon icon={faLock} /></i> Heslo</label>
            <input 
              className="inputField"
              type="text"  
              autoComplete="off" 
              onChange={handleChange} 
              name='pass'/>
          </div>

          <div className="inputWithLabel">  
            <label className="labelForInput "><i><FontAwesomeIcon icon={faGlobe} /></i> Link</label>
            <input 
              className="inputField "
              type="text"  
              autoComplete="off" 
              placeholder="Nevyžaduje sa"
              onChange={handleChange} 
              name='link'/>
          </div>


          <button className='buttonForm'>Aktualizuj Level</button>
        </form>
      </div>
    </div>
  )
}

export default AdminLevelID