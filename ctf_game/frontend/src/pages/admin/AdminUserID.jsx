import axios from 'axios'; 
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

import AdminNav from '../components/AdminNav';
import config from '../../config/config';

import { faUser, faLock, faEnvelope, faCoins, faExclamationCircle, faThumbsUp, faUserAstronaut, faGamepad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
const AdminUserID = () => {  
  const nav = useNavigate(); 
  const { user: loggedUser } = useUser();
  const location = useLocation(); 
  const id = location.pathname.split("/")[4];

  const [user, setUser] = useState({  
    id: '',
    name: '',
    email: '',
    password: '',
    points: '',
    role: ''
  });

  const [msg, setMsg] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${config.apiUrl}/admin/user/${id}`, {
          withCredentials: true
        });
        setUser(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [loggedUser, id, nav]);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));  
  };

  const handleClick = async (e) => { 
    e.preventDefault();

    if (!user.name) {
      return setError(true);
    }

    if (!user.email) {
      return setError(true);
    }

    if (user.password.length < 8) {
      return setError(true);
    }

    if (user.points < 0) {
      return setError(true);
    }
 
    try {
      const response = await axios.put(`${config.apiUrl}/admin/user/${id}`, user, {
        withCredentials: true
      });
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
        <form className='updateForm' onSubmit={handleClick}>

            <div className='textCenter'>
              <h2 style={{marginBottom: "1rem"}}>Update User</h2>
            </div>


          <div className="radioRow">
              <div className="inputWithLabel">
                <label className={"labelForInput " + (error && user.name.length <=0  ? 'labelForInputDanger' : 'null')}><i><FontAwesomeIcon icon={faUser}/></i> {error && !user.name ? "User must have a nick" : "Nick"}</label>
                <input 
                  type="text"
                  className={"inputField " + (error && user.name.length <=0  ? 'inputFieldDanger' : 'null')}
                  autoComplete="off" 
                  onChange={(e) => {
                    setUser({...user, name: e.target.value})
                  }}
                  name='name'
                  value={user.name}/>
              </div>
              

              <div className="inputWithLabel">
                <label className={"labelForInput " + (error && user.email.length <=0  ? 'labelForInputDanger' : 'null')}><i><FontAwesomeIcon icon={faEnvelope}/></i> {error && !user.email ? "User must have an email" : "Email"}</label>
                <input 
                  type="email" 
                  className={"inputField " + (error && user.email.length <=0  ? 'inputFieldDanger' : 'null')}
                  autoComplete="off" 
                  onChange={(e) => {
                    setUser({...user, email: e.target.value})
                  }}
                  name='email'
                  value={user.email}/>
              </div>
            </div>
            
            <div className="radioRow">
              <div className="inputWithLabel">
                <label className={"labelForInput " + (error && user.password.length < 8  ? 'labelForInputDanger' : 'null')}><i><FontAwesomeIcon icon={faLock}/></i> {error && user.password.length < 8 ? "Password must have 7+ chars" : "Password"}</label>
                <input 
                  type="password" 
                  className={"inputField " + (error && user.password.length < 8  ? 'inputFieldDanger' : 'null')}
                  onChange={(e) => {
                    setUser({...user, password: e.target.value})
                  }} 
                  name='password'
                  placeholder='********'
                  />
              </div>
              

              <div className="inputWithLabel">
                <label className={"labelForInput " + (error && user.points < 0  ? 'labelForInputDanger' : 'null')}><i><FontAwesomeIcon icon={faCoins}/></i> {error && user.points < 0  ? 'Points must be above 0' : 'Points'}</label>
                <input 
                  type="number"  
                  className={"inputField " + (error && user.points < 0  ? 'inputFieldDanger' : 'null')}
                  autoComplete="off" 
                  onChange={(e) => {
                    setUser({...user, points: e.target.value})
                  }}
                  name='points'
                  value={user.points}/>
              </div>
            </div>

            <div className='radioRow'>
              <div className='radioRow'>
                <i><FontAwesomeIcon icon={faGamepad}/></i>
                <label className='labelForInput'> Player </label>
              </div>
              <input 
                type='radio'  
                onChange={handleChange} 
                name='role'
                value='player'
                checked={user.role === "player" ? true : false}
                />
            </div>

            <div className='radioRow'>
              <div className='radioRow'>
                <i><FontAwesomeIcon icon={faUserAstronaut}/></i>
                <label className='labelForInput'> Admin </label>
              </div>
              <input 
                type="radio"  
                onChange={handleChange} 
                name='role'
                value="admin"
                checked={user.role === "admin" ? true : false}/>
            </div>

            <button className='buttonForm'>Update user</button>
            {msg.message ? <h5 className='loginDangerLabel'><FontAwesomeIcon icon={faExclamationCircle}/> {msg.message}</h5>: null }
            {msg.messageGreen ? <h5 className="loginSucessLabel"><FontAwesomeIcon icon={faThumbsUp}/> {msg.messageGreen}</h5> : null }
        </form>
      </div>
    </div>
  )
}

export default AdminUserID
