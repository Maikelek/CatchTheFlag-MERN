import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../fotky/hacker.png'; 

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {

    function openNav() {
        document.getElementById("myNav").style.width = "100%";
      }
      
    function closeNav() {
        document.getElementById("myNav").style.width = "0%";
      }    
  

  return (
    <div className='header'>
        <Link to="/domov">
            <img src={logo} alt="hacker" id='logo' />
        </Link>

        <div className='openButton'>
            <span onClick={openNav}> <FontAwesomeIcon icon={faBars}/></span>
        </div>

        <div id="myNav" className='overlay'>
            <span onClick={closeNav} className='closebtn'>&times;</span>
        <div className='overlay-content'>
            <Link to="/">Prihlásenie</Link>
            <Link to="/register">Registrácia</Link>
            <Link to="/levely">Levely</Link>
            <Link to="/profil">Profil</Link>
            <Link to="/logout">Odhlás sa</Link>
        </div>

    </div>
    </div>
  )
}

export default Header;