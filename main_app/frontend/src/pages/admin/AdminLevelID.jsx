import axios from 'axios'; 
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import AdminNav from '../components/AdminNav';

import { faAddressCard, faLock, faCoins, faComments, faCamera, faGlobe, faExclamationCircle, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminLevelID = () => {

  const [msg, setMsg] = useState({});
  const [level, setLevel] = useState({
    id: '',
    title: '',
    hint: '',
    points: '',
    picture: '',
    pass: '',
    link: '',
  });

  const location = useLocation(); 
  const nav = useNavigate();
  const id = location.pathname.split("/")[4];

  useEffect( () => {                
    const fetchAllData = async () => {
        try{
            const res = await axios.get(`http://localhost:8800/admin/level/${id}`)
            setLevel(res.data[0])
        }catch(error) {
            console.log(error)
        }
    }
    fetchAllData()
},[id])


  const handleClick = async (e) => { 
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8800/admin/level/${id}`, level);
      if (response.data) {
        setMsg(response.data)
      }
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
            <h1>Aktualizuj Level: {level.title}</h1>
          </div>

          <div className="inputWithLabel">  
            <label className="labelForInput"><i><FontAwesomeIcon icon={faAddressCard}/></i> Nazov Levelu</label>
            <input 
              type="text"  
              autoComplete="off" 
              name='title'
              value={level.title}
              onChange={(e) => {
                setLevel({...level, title: e.target.value})
              }}/>
          </div>

          <div className="inputWithLabel">  
            <label className="labelForInput"><i><FontAwesomeIcon icon={faComments}/></i> Pomôcka</label>
            <textarea               
                type="text"  
                autoComplete="off" 
                name='hint'
                value={level.hint}
                onChange={(e) => {
                  setLevel({...level, hint: e.target.value})
                }}
              />
          </div>

          <div className="inputWithLabel">  
            <label className="labelForInput"><i><FontAwesomeIcon icon={faCoins}/></i> Body</label>
            <input 
              type="number"  
              autoComplete="off" 
              name='points'
              value={level.points}
              onChange={(e) => {
                setLevel({...level, points: e.target.value})
              }}/>
          </div>

          <div className="inputWithLabel">  
            <label className="labelForInput "><i><FontAwesomeIcon icon={faCamera} /></i> Fotka</label>
            <input 
              type="text"  
              autoComplete="off" 
              placeholder="Nevyžaduje sa"
              name='picture'
              value={level.picture ? level.picture : ""}
              onChange={(e) => {
                setLevel({...level, picture: e.target.value})
              }}/>
          </div>

          <div className="inputWithLabel">  
            <label className="labelForInput"><i><FontAwesomeIcon icon={faLock} /></i> Heslo</label>
            <input 
              type="text"  
              autoComplete="off" 
              name='pass'
              value={level.pass}
              onChange={(e) => {
                setLevel({...level, pass: e.target.value})
              }}/>
          </div>

          <div className="inputWithLabel">  
            <label className="labelForInput "><i><FontAwesomeIcon icon={faGlobe} /></i> Link</label>
            <input 
              type="text"  
              autoComplete="off" 
              placeholder="Nevyžaduje sa"
              name='link'
              value={level.link ? level.link : ""}
              onChange={(e) => {
                setLevel({...level, link: e.target.value})
              }}/>
          </div>


          <button className='buttonForm'>Aktualizuj Level</button>
          {msg.message ? <h5 className='loginDangerLabel'><FontAwesomeIcon icon={faExclamationCircle}/> {msg.message}</h5>: null }
          {msg.messageGreen ? <h5 className="loginSucessLabel"><FontAwesomeIcon icon={faThumbsUp}/> {msg.messageGreen}</h5> : null }
        </form>
      </div>
    </div>
  )
}

export default AdminLevelID