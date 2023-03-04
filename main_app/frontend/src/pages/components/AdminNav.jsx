import React, { useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import config from '../../config/config';


const AdminNav = () => {

  
  const nav = useNavigate();

  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleClick = async e => {   
    e.preventDefault();
    
    fetch(`${config.apiUrl}/auth`, {
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
    <div className="nav">
        <ul>
          <li className='dropdown'>
            <span className='dropbtn'>Moderácia</span>
            <div className='dropdown-content'>
              <Link to="/admin" id={activeLink === '/admin' ? 'adminActive' : ''}>Hlavne menu</Link>
              <Link to="/admin/level/update" id={activeLink === '/admin/level/update' ? 'adminActive' : ''}>Levely</Link>
              <Link to="/admin/user/update" id={activeLink === '/admin/user/update' ? 'adminActive' : ''}>Používatelia</Link>
            </div>
          </li>
          <li className='dropdown'>
            <span className='dropbtn'>Cesty</span>
            <div className='dropdown-content'>
              <Link to="/stats">Štatistika</Link>
              <Link to="/domov">Domov</Link>
              <Link to="/levely">Levely</Link>
              <Link to="/profil">Profil</Link>
            </div>
          </li>
          <li className='dropdown'>
            <span className='dropbtn'>Pridávanie</span>
            <div className='dropdown-content'>
              <Link to="/admin/level/add" id={activeLink === '/admin/level/add' ? 'adminActive' : ''}>Level</Link>
              <Link to="/admin/user/add" id={activeLink === '/admin/user/add' ? 'adminActive' : ''}>Používateľ</Link>
              <Link onClick={handleClick}>Odhlás sa</Link>
            </div>
          </li>
        </ul>
      </div>
  )
}

export default AdminNav;