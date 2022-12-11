import React from 'react';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../fotky/hacker.png'; 

import { faEye, faUser, faLock, faEyeSlash, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Index = () => {

    const nav = useNavigate(); 

    const [eye, setEye] = useState(faEye);

    const [msg, setMsg] = useState({})

    const [user, setUser] = useState({ 
        email: "",
        password: "",
      });

    function hesloToggle() {
        let hesloInput = document.getElementById("hesloInput");

        if (hesloInput.type === "password") {
          hesloInput.type = "type"
          setEye(faEyeSlash)
        }
  
        else {
          hesloInput.type = "password"
          setEye(faEye)
        }
  
      }

      const handleChange = (e) => {
        setUser(prev => ({...prev, [e.target.name]: e.target.value})); 
      };

      const handleClick = async e => {   
        e.preventDefault();
       
        fetch('http://localhost:8800/auth/login', {
          method:'POST',
          body: JSON.stringify(user), 
          headers: {
              'Content-Type':'application/json'
          }
          }).then(res => res.json()) 
          .then(response => {
            if (response.message === "200") {
              nav("/levely"); 
            } else {
              setMsg(response)
            }
          })
          .catch(err => {
              console.log(err);
              alert(err);
          });
      }

  return (
    <div className='container'>
        
        <div className='header'>
            <Link to="/domov">
                <img src={logo} alt="hacker" id='logo' />
            </Link>
        </div>
        
        <div className='woLogin'>
            <h1>Nemáš ešte účet?</h1>
            <p>Zaregistruj sa tu a začni hrať</p>
            <Link to="/register">
                <button className='button-49'>Registrácia</button>
            </Link>        
        </div>

        <form className='login' onSubmit={handleClick}>
            <h3>Prihlás sa</h3>
            <p>A nájdi rôzne chyby vo webových technológiach. Vzhľadom na typ hry odporúčam používať počítač/notebook</p>

            <div className='input'>
                <input 
                    className='inputBlueFocus' 
                    onChange={handleChange} 
                    name="email"
                    autoComplete='off'
                    type="text" 
                    placeholder='Zadaj svoj email: '/>
                <label><FontAwesomeIcon icon={faUser}/></label>
            </div>
            
            <div className='input'>
                <input 
                    className='inputBlueFocus' 
                    id="hesloInput" 
                    name="password" 
                    onChange={handleChange} 
                    type="password" 
                    placeholder="Zadaj svoje heslo: "/>
                <label><FontAwesomeIcon icon={faLock}/></label>
                <label id='eye' onClick={hesloToggle}><FontAwesomeIcon icon={eye}/></label>
            </div>
            {msg.message ? <label className='loginDangerLabel'><FontAwesomeIcon icon={faExclamationCircle}/> {msg.message}</label>: null }
            <button className='signin' type="submit">Prihlas sa</button>

            <div className='mobil'>
                <p>Nemáš účet?</p>
                <Link to="/register">Zaregistruj sa</Link>
            </div>

        </form>
    </div>
  )
}

export default Index;