import axios from 'axios'; 
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AdminNav from '../components/AdminNav';

import { faAddressCard, faLock, faCoins, faComments, faCamera, faGlobe, faExclamationCircle, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 

const AdminLevelAdd = () => {

  const [error, setError] = useState(false)
  const [msg, setMsg] = useState({});
  const [level, setLevel] = useState({ 
    title: "",
    hint: "",
    points: "",
    picture: "",
    pass: "",
    link: ""
  });

  const nav = useNavigate(); 

  const handleClick = async e => {   
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8800/admin/level`, level);
      if (response.data) {
        setMsg(response.data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <AdminNav />
      <div className='content'>
      <form onSubmit={handleClick} className='updateForm'>

        <div className='textCenter'>
          <h1>Pridaj Level</h1>
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

export default AdminLevelAdd;

