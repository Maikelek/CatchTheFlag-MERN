import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import AdminNav from '../components/AdminNav';
import LevelController from '../components/LevelController'
import config from '../../config/config';


const AdminLevelUpdate = () => {

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
      <LevelController/>
    </div>
  )
}

export default AdminLevelUpdate;