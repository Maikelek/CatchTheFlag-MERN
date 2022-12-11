import axios from 'axios'; 
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AdminNav from '../components/AdminNav';

import { faAddressCard, faLock, faCoins, faComments, faCamera, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 

const AdminLevelAdd = () => {

  const [error, setError] = useState(false)

  const [level, setLevel] = useState({ 
    title: "",
    hint: "",
    points: "",
    picture: "",
    pass: "",
    link: ""
  });

  const nav = useNavigate(); 

  const handleChange = (e) => {
    setLevel(prev => ({...prev, [e.target.name]: e.target.value}));  
  };

  const handleClick = async e => {   
    e.preventDefault();
    
    if (level.title.length <= 0) {
      setError(true)
    }
    if (level.hint.length <= 0) {
      setError(true)
    }
    if (level.pass.length <= 0) {
      setError(true)
    }

    if (level.title && level.hint && level.pass ){
      await axios.post("http://localhost:8800/level/add", level); 
      nav("/admin/level/update"); 
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
            <label className={"labelForInput " + (error && level.title.length <=0  ? 'labelForInputDanger' : 'null')}><i><FontAwesomeIcon icon={faAddressCard}/></i> Nazov Levelu</label>
            <input 
              className={"inputField " + (error && level.title.length <=0  ? 'inputFieldDanger' : 'null')}
              type="text"  
              autoComplete="off" 
              placeholder={error && level.title.length <=0 ? "Level musí mať názov": null }
              onChange={handleChange} 
              name='title'/>
          </div>

          <div className="inputWithLabel">  
            <label className={"labelForInput " + (error && level.hint.length <=0  ? 'labelForInputDanger' : 'null')}><i><FontAwesomeIcon icon={faComments}/></i> Pomôcka</label>
            <input 
              className={"inputField " + (error && level.hint.length <=0  ? 'inputFieldDanger' : 'null')}
              type="text"  
              autoComplete="off" 
              placeholder={error && level.hint.length <=0 ? "Level musí mať pomôcku": null }
              onChange={handleChange} 
              name='hint'/>
          </div>

          <div className="inputWithLabel">  
            <label className={"labelForInput " + (error && level.points.length <=0  ? 'labelForInputDanger' : 'null')}><i><FontAwesomeIcon icon={faCoins}/></i> Body</label>
            <input 
              className={"inputField " + (error && level.points.length <=0  ? 'inputFieldDanger' : 'null')}
              type="number"  
              autoComplete="off" 
              placeholder={error && level.points.length <=0 ? "Zadaj počet bodov": null }
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
            <label className={"labelForInput " + (error && level.pass.length <=0  ? 'labelForInputDanger' : 'null')}><i><FontAwesomeIcon icon={faLock} /></i> Heslo</label>
            <input 
              className={"inputField " + (error && level.pass.length <=0  ? 'inputFieldDanger' : 'null')}
              type="text"  
              autoComplete="off" 
              placeholder={error && level.pass.length <=0 ? "Heslo je nutné": null }
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


          <button className='buttonForm'>Pridaj Level</button>
        </form>
      </div>
    </div>
  )
}

export default AdminLevelAdd;

