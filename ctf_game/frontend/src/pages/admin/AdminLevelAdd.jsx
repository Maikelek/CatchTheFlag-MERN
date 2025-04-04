import axios from 'axios'; 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

import AdminNav from '../components/AdminNav';
import config from '../../config/config';

import { faAddressCard, faLock, faCoins, faComments, faCamera, faGlobe, faExclamationCircle, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
const AdminLevelAdd = () => {

  const nav = useNavigate(); 
  const { user } = useUser();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      nav("/");
    }
  }, [user, nav]);

  const [error, setError] = useState(false);
  const [msg, setMsg] = useState({});
  const [level, setLevel] = useState({ 
    title: "",
    hint: "",
    points: "",
    picture: "",
    pass: "",
    link: ""
  });

  const handleClick = async e => {   
    e.preventDefault();

    if (!level.title || !level.hint || !level.pass || level.points < 0) {
      return setError(true);
    }

    try {
      const response = await axios.post(`${config.apiUrl}/admin/level`, level, {
        withCredentials: true
      });
      if (response.data) {
        setMsg(response.data);
        console.log(response.data);
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
            <h2 style={{ marginBottom: "2rem" }}>Add Level</h2>
          </div>

          <div className="radioRow">

            <div className="inputWithLabel">  
              <label className={"labelForInput " + (error && !level.title  ? 'labelForInputDanger' : 'null')}><i><FontAwesomeIcon icon={faAddressCard}/></i> {error && !level.title ? "Level must have a title" : "Title"} </label>
              <input 
                type="text"  
                className={"inputField " + (error && !level.title  ? 'inputFieldDanger' : 'null')}
                autoComplete="off" 
                name='title'
                value={level.title}
                onChange={(e) => {
                  setLevel({ ...level, title: e.target.value });
                }}/>
            </div>

            <div className="inputWithLabel">  
              <label className={"labelForInput " + (error && level.points < 0  ? 'labelForInputDanger' : 'null')}><i><FontAwesomeIcon icon={faCoins}/></i> {error && level.points < 0 ? "Points must be above 0" : "Points"}</label>
              <input 
                type="number"  
                className={"inputField " + (error && level.points < 0  ? 'inputFieldDanger' : 'null')}
                autoComplete="off" 
                name='points'
                value={level.points}
                onChange={(e) => {
                  setLevel({ ...level, points: e.target.value });
                }}/>
            </div>
          </div>

          <div className="radioRow">
            <div className="inputWithLabel">  
              <label className="labelForInput "><i><FontAwesomeIcon icon={faCamera} /></i> Photo</label>
              <input 
                type="text"  
                className='inputField'
                autoComplete="off" 
                placeholder="Not needed"
                name='picture'
                value={level.picture ? level.picture : ""}
                onChange={(e) => {
                  setLevel({ ...level, picture: e.target.value });
                }}/>
            </div>

            <div className="inputWithLabel">  
              <label className="labelForInput "><i><FontAwesomeIcon icon={faGlobe} /></i> Link</label>
              <input 
                type="text"  
                className='inputField'
                autoComplete="off" 
                placeholder="Not needed"
                name='link'
                value={level.link ? level.link : ""}
                onChange={(e) => {
                  setLevel({ ...level, link: e.target.value });
                }}/>
            </div>
          </div>

          <div className="radioRow">
            <div className="inputWithLabel">  
              <label className={"labelForInput " + (error && !level.hint  ? 'labelForInputDanger' : 'null')}><i><FontAwesomeIcon icon={faComments}/></i> {error && !level.hint  ? 'Level must have a hint' : 'Hint'}</label>
              <textarea               
                  type="text"  
                  className={"inputField " + (error && !level.hint  ? 'inputFieldDanger' : 'null')}
                  autoComplete="off" 
                  name='hint'
                  value={level.hint}
                  onChange={(e) => {
                    setLevel({ ...level, hint: e.target.value });
                  }}
                />
            </div>

            <div className="inputWithLabel">  
              <label className={"labelForInput " + (error && !level.pass  ? 'labelForInputDanger' : 'null')}><i><FontAwesomeIcon icon={faLock}/></i> {error && !level.pass  ? 'Level must have a password' : 'Password'}</label>
              <input 
                type="text"  
                className={"inputField " + (error && !level.pass  ? 'inputFieldDanger' : 'null')}
                autoComplete="off" 
                name='pass'
                value={level.pass}
                onChange={(e) => {
                  setLevel({ ...level, pass: e.target.value });
                }}/>
            </div>
          </div>

          <button className='buttonForm'>Add level</button>
          {msg.message ? <h5 className='loginDangerLabel'><FontAwesomeIcon icon={faExclamationCircle}/> {msg.message}</h5>: null }
          {msg.messageGreen ? <h5 className="loginSucessLabel"><FontAwesomeIcon icon={faThumbsUp}/> {msg.messageGreen}</h5> : null }
        </form>
      </div>
    </div>
  );
}

export default AdminLevelAdd;
