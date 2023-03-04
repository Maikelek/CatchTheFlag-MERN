import axios from 'axios'; 
import React from 'react';
import { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AdminNav from '../components/AdminNav';
import config from '../../config/config';

import { faUser, faLock, faEnvelope, faCoins, faExclamationCircle, faThumbsUp, faUserAstronaut, faGamepad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 

const AdminUserID = () => {  

  const nav = useNavigate(); 
  const [logged, setLogged] = useState(0);

  useEffect(() => {
    fetch(`${config.apiUrl}/auth`, {
        method:'GET',
        headers: {
            'Content-Type':'application/json'
        },
        credentials: 'include'
        }).then(res => res.json()) 
        .then(response => {
          if (response.auth !== true && response.user.role !== "admin" ) {
            nav("/"); 
          }
          else {
            setLogged(response.user.id);
          }
        })
       
    },[nav])

  const [user, setUser] = useState({  
    id: '',
    name: '',
    email: '',
    password: '',
    points: '',
    role: ''
  })

  const [msg, setMsg] = useState({});
  const [error, setError] = useState(false);

  const location = useLocation(); 
  const id = location.pathname.split("/")[4];

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));  
  };

  useEffect( () => {       
    if (logged >= 1) {          
      const fetchAllData = async () => {
          try{
              const res = await axios.get(`${config.apiUrl}/admin/user/${id}`)
              setUser(res.data[0]);
          }catch(error) {
              console.log(error);
          }
      }
      fetchAllData()
    }
  },[id, logged])


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
      const response = await axios.put(`http://localhost:8800/admin/user/${id}`, user);
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
              <h2 style={{marginBottom: "1rem"}}>Aktualizuj Používateľa</h2>
            </div>


          <div className="radioRow">
              <div className="inputWithLabel">
                <label className={"labelForInput " + (error && user.name.length <=0  ? 'labelForInputDanger' : 'null')}><i><FontAwesomeIcon icon={faUser}/></i> {error && !user.name ? "Používateľ musí mať meno" : "Meno"}</label>
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
                <label className={"labelForInput " + (error && user.email.length <=0  ? 'labelForInputDanger' : 'null')}><i><FontAwesomeIcon icon={faEnvelope}/></i> {error && !user.email ? "Používateľ musí mať email" : "Email"}</label>
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
                <label className={"labelForInput " + (error && user.password.length < 8  ? 'labelForInputDanger' : 'null')}><i><FontAwesomeIcon icon={faLock}/></i> {error && user.password.length < 8 ? "Heslo musí mať 7+ znakov" : "Heslo"}</label>
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
                <label className={"labelForInput " + (error && user.points < 0  ? 'labelForInputDanger' : 'null')}><i><FontAwesomeIcon icon={faCoins}/></i> {error && user.points < 0  ? 'Body musia byť viac ako 0' : 'Body'}</label>
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
                <label className='labelForInput'> Hráč </label>
              </div>
              <input 
                type='radio'  
                onChange={handleChange} 
                name='role'
                value='hrac'
                checked={user.role === "hrac" ? true : false}
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

            <button className='buttonForm'>Aktualizuj Používateľa</button>
            {msg.message ? <h5 className='loginDangerLabel'><FontAwesomeIcon icon={faExclamationCircle}/> {msg.message}</h5>: null }
            {msg.messageGreen ? <h5 className="loginSucessLabel"><FontAwesomeIcon icon={faThumbsUp}/> {msg.messageGreen}</h5> : null }
        </form>
      </div>
    </div>
  )
}

export default AdminUserID