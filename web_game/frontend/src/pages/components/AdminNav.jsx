import React from 'react';
import { Link } from 'react-router-dom'


const AdminNav = () => {

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
              <Link>Odhlás sa</Link>
            </div>
          </li>
        </ul>
      </div>
  )
}

export default AdminNav;