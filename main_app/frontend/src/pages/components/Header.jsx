import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import axios from "axios"

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from '../../config/config';

const Header = () => {

    const location = useLocation();
    const nav = useNavigate();

    function openNav() {
        document.getElementById("myNav").style.width = "100%";
      }
      
    function closeNav() {
        document.getElementById("myNav").style.width = "0%";
      } 

      const [id, setID] = useState(0);
      const [role, setRole] = useState("");
      const [activeLink, setActiveLink] = useState('');

      useEffect(() => {
        setActiveLink(location.pathname);
      }, [location]);
      
      useEffect(() => {
        axios.get(`${config.apiUrl}/auth`, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
        .then(response => {
          if (response.data.auth === true) {
            setID(response.data.user.id);
            setRole(response.data.user.role);
          }
        })
        .catch(error => {
          console.log(error);
        });
      }, []);
      
      const handleClick = async e => {   
        e.preventDefault();
        try {
          const response = await axios.delete(`${config.apiUrl}/auth`, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          });
          if (response.data.logout === true) {
            nav("/");
          }
        } catch (error) {
          console.log(error);
          alert(error);
        }
      };
  

  return (
    <div className='header'>

        <div className='openButton'>
            <span onClick={openNav}> <FontAwesomeIcon icon={faBars}/></span>
        </div>

        <div id="myNav" className='overlay'>

            <span onClick={closeNav} className='closebtn'>&times;</span>
            <div className='overlay-content'>
                {role === "admin" ? <Link to="/admin">Admin menu</Link> : null }
                <Link to="/domov" id={activeLink === '/domov' ? 'active' : ''}>Home</Link>
                {id > 0 ?  null : <Link to="/" id={activeLink === '/' ? 'active' : ''}>Log in</Link>}
                {id > 0 ?  null : <Link to="/register" id={activeLink === '/register' ? 'active' : ''}>Registration</Link>}
                {id === 0 ?  null : <Link to="/levely" id={activeLink === '/levely' ? 'active' : ''}>Levels</Link>}
                {id === 0 ?  null : <Link to="/stats" id={activeLink === '/stats' ? 'active' : ''}>Stats</Link>}
	        {id === 0 ?  null : <Link to="/profil" id={activeLink === '/profil' ? 'active' : ''}>Profil</Link>}
                {id === 0 ?  null : <Link onClick={handleClick}>Log out</Link>}
            </div>

        </div>
        
    </div>
  )
}

export default Header;
