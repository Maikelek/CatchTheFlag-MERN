import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { faEye, faUser, faLock, faEyeSlash, faEnvelope, faLockOpen, faExclamationCircle, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




const Regpage = () => {  

  const [eye1, setEye1] = useState(faEye);
  const [eye2, setEye2] = useState(faEye);

  function hesloToggle() {
    let hesloInput = document.getElementById("hesloInput1");
  
    if (hesloInput.type === "password") {
      hesloInput.type = "type"
      setEye1(faEyeSlash);
    }
  
    else {
      hesloInput.type = "password";
      setEye1(faEye);
    }
  
  }
  
  function hesloToggle2() {
    let hesloInput2 = document.getElementById("hesloInput2");
  
    if (hesloInput2.type === "password") {
      hesloInput2.type = "type";
      setEye2(faEyeSlash);
    }
  
    else {
      hesloInput2.type = "password";
      setEye2(faEye);
    }
  }
  

  const [user, setUser] = useState({ 
    name: "",
    email: "",
    password: "",
    passowrdRep: ""
  });

  const [msg, setMsg] = useState({});
  
  
  const handleChange = (e) => {
    setUser(prev => ({...prev, [e.target.name]: e.target.value})); 
  };

  const handleClick = async e => {   
    e.preventDefault();
   
    fetch('http://localhost:8800/register', {
      method:'POST',
      body: JSON.stringify(user), 
      headers: {
          'Content-Type':'application/json'
      }
      }).then(res => res.json()) 
      .then(response => {
        if (response.message === "Si zaregistrovaný") {
          setMsg(response);
        } else {
          setMsg(response);
        }
      })
      .catch(err => {
          console.log(err);
          alert(err);
      });
  }

  return (
    <div className='container'>

      <div className="bluredDiv">

        <form onSubmit={handleClick} className='loginReg'>
          <h1>Registrácia</h1>

          <div className='inputReg'>
            <input 
              className='inputBlueFocus' 
              name="name" 
              type="text" 
              autoComplete="off" 
              onChange={handleChange} 
              placeholder='Zadaj svoj meno: '/>
            <label><FontAwesomeIcon icon={faUser}/></label>
          </div>
                
          <div className='inputReg'>
            <input 
              className='inputBlueFocus' 
              name="email" 
              type="email" 
              autoComplete="off" 
              onChange={handleChange} 
              placeholder="Zadaj svoje email: "/>
            <label><FontAwesomeIcon icon={faEnvelope}/></label>
          </div>

          <div className='inputReg'>
            <input 
              id='hesloInput1' 
              className='inputBlueFocus' 
              name="password" 
              type="password" 
              onChange={handleChange} 
              placeholder="Zadaj svoje heslo: "/>
            <label><FontAwesomeIcon icon={faLock}/></label>
            <label id='eye' onClick={hesloToggle}><FontAwesomeIcon icon={eye1}/></label>
          </div>

          <div className='inputReg'>
            <input 
              id='hesloInput2' 
              className='inputBlueFocus' 
              name="passwordRep" 
              type="password" 
              onChange={handleChange} 
              placeholder="Zopakuj svoje heslo: "/>
            <label><FontAwesomeIcon icon={faLockOpen}/></label> 
            <label id='eye2' onClick={hesloToggle2}><FontAwesomeIcon icon={eye2}/></label>
          </div>

          {msg.message ? <label className="loginDangerLabel"><FontAwesomeIcon icon={faExclamationCircle}/> {msg.message}</label> : null }
          {msg.messageGreen ? <label className="loginSucessLabel"><FontAwesomeIcon icon={faThumbsUp}/> {msg.messageGreen}</label> : null }
          <button className='regButton' type="submit">Registruj sa</button>

          <div className='mobilReg'>
              <p>Ak máš účet</p>
              <Link to='/'>Prihlás sa tu</Link>
          </div>
        </form>

      </div>

    </div>
  )
}

export default Regpage;