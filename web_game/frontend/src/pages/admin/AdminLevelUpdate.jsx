import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import axios from "axios"
import AdminNav from '../components/AdminNav';

const AdminLevelUpdate = () => {
  
  const [levely, setLevely] = useState ( [] )

  useEffect( () => {                
      const fetchAllLevely = async () => {
          try{
              const res = await axios.get("http://localhost:8800/level/display")
              setLevely(res.data)
          }catch(error) {
              console.log(error)
          }
      }
      fetchAllLevely()
  },[])

  const handleDelete = async (id) => {         
    try {
      await axios.delete(`http://localhost:8800/level/remove/${id}`);
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
        <h1>Moderacia levelov</h1>
          {levely.map(level => (
            <div className='update' key={level.id}>
                <h1>{level.title}</h1>
                <div>
                  <button className='zmaz' onClick={() => handleDelete(level.id)}>Zmaž</button>
                  <Link to={`${level.id}`}><button className='uprav'>Uprav</button></Link>
                </div> 
            </div>  
          ))}
          </div>
        </div>

      </div>
  )
}

export default AdminLevelUpdate;