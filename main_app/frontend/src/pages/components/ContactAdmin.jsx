import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const ContantAdmin = () => {

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
    <div className='adminProblem'>
      <p>Máš problém?</p>
      <Link to='/'>Kontaktuj admina! </Link>
    </div>
  )
}

export default ContantAdmin;