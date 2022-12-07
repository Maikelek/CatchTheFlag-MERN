import React from 'react';
import { Link } from 'react-router-dom'
import { useState } from 'react';

import logo from '../../fotky/hacker.png'; 

import { faEye, faUser, faLock, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Index = () => {

    const [eye, setEye] = useState(faEye);

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

        <div className='login'>
            <h3>Prihlás sa</h3>
            <p>A nájdi rôzne chyby vo webových technológiach. Vzhľadom na typ hry odporúčam používať počítač/notebook</p>

            <div className='input'>
                <input className='inputBlueFocus' type="text" placeholder='Zadaj svoj email: '/>
                <label><FontAwesomeIcon icon={faUser}/></label>
            </div>
            
            <div className='input'>
                <input id="hesloInput" name="password" type="password" placeholder="Zadaj svoje heslo: "/>
                <label><FontAwesomeIcon icon={faLock}/></label>
                <label id='eye' onClick={hesloToggle}><FontAwesomeIcon icon={eye}/></label>
            </div>

            <button className='signin' type="submit">Prihlas sa</button>

            <div className='mobil'>
                <p>Nemáš účet?</p>
                <Link to="/register">Zaregistruj sa</Link>
            </div>
        </div>
    </div>
  )
}

export default Index;