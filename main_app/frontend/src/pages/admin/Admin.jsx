import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import AdminNav from '../components/AdminNav';


const Admin = () => {

  const nav = useNavigate(); 

  useEffect(() => {
    fetch('http://localhost:8800/auth', {
        method:'GET',
        headers: {
            'Content-Type':'application/json'
        },
        credentials: 'include'
        }).then(res => res.json()) 
        .then(response => {
          if (response.auth !== true && response.user.role !== "admin" ) {
            nav("/"); 
          }
        })
        
    },[nav])


  return (
    <div>
      <AdminNav />
      <div className='content'>
        <div className="spotUpdate">
          <h1 style={{textAlign: "center"}}>Moderuj web pomocou tohto rozhrania</h1>
        </div>
      </div>

      </div>
  )
}

export default Admin;