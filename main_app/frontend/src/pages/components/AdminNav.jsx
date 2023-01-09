import React from 'react';
import { Link, useNavigate } from 'react-router-dom'


const AdminNav = () => {

  
  const nav = useNavigate();

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
    <div className="nav">
        <ul>
          <li className='dropdown'>
            <span className='dropbtn'>Moderácia</span>
            <div className='dropdown-content'>
              <Link to="/admin">Hlavne menu</Link>
              <Link to="/admin/level/update">Levely</Link>
              <Link to="/admin/user/update">Používatelia</Link>
            </div>
          </li>
          <li className='dropdown'>
            <span className='dropbtn'>Cesty</span>
            <div className='dropdown-content'>
              <Link to="/register">Registrácia</Link>
              <Link to="/stats">Štatistika</Link>
              <Link to="/">Prihlásenie</Link>
              <Link to="/domov">Domov</Link>
              <Link to="/levely">Levely</Link>
              <Link>Profil</Link>
            </div>
          </li>
          <li className='dropdown'>
            <span className='dropbtn'>Pridávanie</span>
            <div className='dropdown-content'>
              <Link to="/admin/level/add">Level</Link>
              <Link to="/admin/user/add">Používateľ</Link>
              <Link onClick={handleClick}>Odhlás sa</Link>
            </div>
          </li>
        </ul>
      </div>
  )
}

export default AdminNav;