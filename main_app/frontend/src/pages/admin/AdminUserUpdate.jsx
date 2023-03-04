import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import AdminNav from '../components/AdminNav';
import UserController from '../components/UserController'
import config from '../../config/config';


const AdminUserUpdate = () => {
  
  const nav = useNavigate(); 

  useEffect(() => {
    fetch(`${config.apiUrl}/auth`, {
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
      <UserController/>
    </div>
  )
}

export default AdminUserUpdate;