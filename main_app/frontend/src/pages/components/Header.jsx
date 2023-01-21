import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';

import logo from '../../images/hacker.png'; 

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        fetch('http://localhost:8800/auth', {
            method:'GET',
            headers: {
                'Content-Type':'application/json'
            },
            credentials: 'include'
            }).then(res => res.json()) 
            .then(response => {
              if( response.auth === true ) {
                setID(response.user.id);
                setRole(response.user.role);
              } 
            })
           
        },[]);

      const handleClick = async e => {   
        e.preventDefault();
        
        fetch('http://localhost:8800/auth', {
          method:'DELETE',
          headers: {
              'Content-Type':'application/json'
          },
          credentials: 'include'
          }).then(res => res.json()) 
          .then(response => {
            if (response.logout === true) {
              nav("/"); 
            } 
          })
          .catch(err => {
              console.log(err);
              alert(err);
          });
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
                {role === "admin" ? <Link to="/admin">Admin menu</Link> : null }
                <Link to="/domov" id={activeLink === '/domov' ? 'active' : ''}>Domov</Link>
                <Link to="/stats" id={activeLink === '/stats' ? 'active' : ''}>Štatistika</Link>
                {id > 0 ?  null : <Link to="/" id={activeLink === '/' ? 'active' : ''}>Prihlásenie</Link>}
                {id > 0 ?  null : <Link to="/register" id={activeLink === '/register' ? 'active' : ''}>Registrácia</Link>}
                {id === 0 ?  null : <Link to="/levely" id={activeLink === '/levely' ? 'active' : ''}>Levely</Link>}
                {id === 0 ?  null : <Link to="/profil" id={activeLink === '/profil' ? 'active' : ''}>Profil</Link>}
                {id === 0 ?  null : <Link onClick={handleClick}>Odhlás sa</Link>}
            </div>

        </div>
    </div>
  )
}

export default Header;