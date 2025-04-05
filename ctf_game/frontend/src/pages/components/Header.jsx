import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '../../config/config';
import { useUser } from '../../context/UserContext';

const Header = () => {
    const location = useLocation();
    const nav = useNavigate();
    const { user, setUser } = useUser();

    const [activeLink, setActiveLink] = useState('');

    const openNav = () => {
        document.getElementById("myNav").style.width = "100%";
    };

    const closeNav = () => {
        document.getElementById("myNav").style.width = "0%";
    };

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    const handleLogout  = async e => {   
      e.preventDefault();
      try {
        const response = await axios.delete(`${config.apiUrl}/auth`, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        if (response.data.logout === true) {
          setUser(null);
          nav("/");
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };

    return (
        <div className="header">
            <div className="openButton">
                <span onClick={openNav}>
                    <FontAwesomeIcon icon={faBars} />
                </span>
            </div>

            <div id="myNav" className="overlay">
                <span onClick={closeNav} className="closebtn">&times;</span>
                <div className="overlay-content">
                    {user?.role === "admin" && <Link to="/admin">Admin menu</Link>}
                    <Link to="/Home" id={activeLink === '/Home' ? 'active' : ''}>Home</Link>
                    {!user && <Link to="/" id={activeLink === '/' ? 'active' : ''}>Log in</Link>}
                    {!user && <Link to="/register" id={activeLink === '/register' ? 'active' : ''}>Registration</Link>}
                    {user && <Link to="/Levels" id={activeLink === '/Levels' ? 'active' : ''}>Levels</Link>}
                    {user && <Link to="/stats" id={activeLink === '/stats' ? 'active' : ''}>Stats</Link>}
                    {user && <Link to="/profile" id={activeLink === '/profil' ? 'active' : ''}>Profil</Link>}
                    {user && <Link onClick={handleLogout}>Log out</Link>}
                </div>
            </div>
        </div>
    );
};

export default Header;
