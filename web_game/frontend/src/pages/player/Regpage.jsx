import React from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom'
import { useState } from 'react';

import { faEye, faUser, faLock, faEyeSlash, faEnvelope, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




const Regpage = () => {  

  const [eye1, setEye1] = useState(faEye);
  const [eye2, setEye2] = useState(faEye);

  function hesloToggle() {
    let hesloInput = document.getElementById("hesloInput1");
  
    if (hesloInput.type === "password") {
      hesloInput.type = "type"
      setEye1(faEyeSlash)
    }
  
    else {
      hesloInput.type = "password"
      setEye1(faEye)
    }
  
  }
  
  function hesloToggle2() {
    let hesloInput2 = document.getElementById("hesloInput2");
  
    if (hesloInput2.type === "password") {
      hesloInput2.type = "type"
      setEye2(faEyeSlash)
    }
  
    else {
      hesloInput2.type = "password"
      setEye2(faEye)
    }
  }
  

  const [user, setUser] = useState({ 
    name: "",
    email: "",
    password: "",
    passowrdRep: ""
  });
  
  
  const handleChange = (e) => {
    setUser(prev => ({...prev, [e.target.name]: e.target.value}));  
  };
  
  const handleClick = async e => {   
    e.preventDefault();
    
    if (user.email === "") {
      console.log("empty")
    }
  
    try{
      await axios.post("http://localhost:8800/user/add", user); 
    }catch(error) {
      console.log(error);  
    };
  } 

  return (
    <div className='container'>
            
      <form onSubmit={handleClick} className='loginReg'>
        <h1>Registrácia</h1>

        <div className='inputReg'>
          <input className='inputBlueFocus' name="name" type="text" autoComplete="off" required={true} onChange={handleChange} placeholder='Zadaj svoj meno: '/>
          <label><FontAwesomeIcon icon={faUser}/></label>
        </div>
              
        <div className='inputReg'>
          <input className='inputBlueFocus' name="email" type="email" required={true} autoComplete="off" onChange={handleChange} placeholder="Zadaj svoje email: "/>
          <label><FontAwesomeIcon icon={faEnvelope}/></label>
        </div>

        <div className='inputReg'>
          <input className='inputBlueFocus' name="password" type="password" required={true} onChange={handleChange} placeholder="Zadaj svoje heslo: "/>
          <label><FontAwesomeIcon icon={faLock}/></label>
          <label id='eye' onClick={hesloToggle}><FontAwesomeIcon icon={eye1}/></label>
        </div>

        <div className='inputReg'>
          <input className='inputBlueFocus' name="passwordRep" type="password" required={true} onChange={handleChange} placeholder="Zopakuj svoje heslo: "/>
          <label><FontAwesomeIcon icon={faLockOpen}/></label>
          <label id='eye2' onClick={hesloToggle2}><FontAwesomeIcon icon={eye2}/></label>
        </div>

        <button className='regButton' type="submit">Registruj sa</button>

        <div className='mobilReg'>
          <p>Ak máš účet</p>
          <Link to='/'>Prihlás sa tu</Link>
      </div>
      </form>
        
    </div>
  )
}

export default Regpage;