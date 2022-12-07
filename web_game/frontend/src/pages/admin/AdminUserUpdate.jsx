import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import axios from "axios"
import AdminNav from '../components/AdminNav';

const AdminUserUpdate = () => {
  
  const [users, setUsers] = useState ( [] )

  useEffect( () => {                
      const fetchAllUsers = async () => {
          try{
              const res = await axios.get("http://localhost:8800/user/display")
              setUsers(res.data)
          }catch(error) {
              console.log(error)
          }
      }
      fetchAllUsers()
  },[])

  const handleDelete = async (id) => {         
    try {
      await axios.delete(`http://localhost:8800/user/remove/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>

      <AdminNav />

      <div className='content'>
        <div className="spotUpdate">
        <h1>Moderacia používateľov</h1>
          {users.map(user => (
            <div className='update' key={user.id}>
                <h1>{user.name}</h1>
                <div>
                  <button className='zmaz' onClick={() => handleDelete(user.id)}>Zmaž</button>
                  <Link to={`${user.id}`}><button className='uprav'>Uprav</button></Link>
                </div> 
            </div>  
          ))}
          </div>
        </div>

      </div>
  )
}

export default AdminUserUpdate;