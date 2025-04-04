import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import config from '../../config/config';
import axios from "axios";

const AdminNav = () => {
  const nav = useNavigate();
  const { setUser } = useUser();
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleClick = async (e) => {   
    e.preventDefault();
    try {
      const response = await axios.delete(`${config.apiUrl}/auth`, { withCredentials: true });
      if (response.data.logout === true) {
        setUser(null);
        nav("/");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while logging out.");
    }
  };

  return (
    <div className="nav">
      <ul>
        <li className='dropdown'>
          <span className='dropbtn'>Managing</span>
          <div className='dropdown-content'>
            <Link to="/admin" id={activeLink === '/admin' ? 'adminActive' : ''}>Main menu</Link>
            <Link to="/admin/level/update" id={activeLink === '/admin/level/update' ? 'adminActive' : ''}>Levels</Link>
            <Link to="/admin/user/update" id={activeLink === '/admin/user/update' ? 'adminActive' : ''}>Users</Link>
          </div>
        </li>
        <li className='dropdown'>
          <span className='dropbtn'>Routes</span>
          <div className='dropdown-content'>
            <Link to="/stats">Stats</Link>
            <Link to="/Home">Home</Link>
            <Link to="/Levels">Levels</Link>
            <Link to="/profil">Profil</Link>
          </div>
        </li>
        <li className='dropdown'>
          <span className='dropbtn'>Adding</span>
          <div className='dropdown-content'>
            <Link to="/admin/level/add" id={activeLink === '/admin/level/add' ? 'adminActive' : ''}>Level</Link>
            <Link to="/admin/user/add" id={activeLink === '/admin/user/add' ? 'adminActive' : ''}>User</Link>
            <Link onClick={handleClick}>LogOut</Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AdminNav;
