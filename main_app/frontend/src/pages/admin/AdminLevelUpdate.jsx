import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import axios from "axios"
import AdminNav from '../components/AdminNav';

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminLevelUpdate = () => {
  
  const [levely, setLevely] = useState ( [] )

  useEffect( () => {                
      const fetchAllLevely = async () => {
          try{
              const res = await axios.get("http://localhost:8800/level")
              setLevely(res.data)
          }catch(error) {
              console.log(error)
          }
      }
      fetchAllLevely()
  },[])

  const handleDelete = async (id) => {         
    try {
      await axios.delete(`http://localhost:8800/level/${id}`);
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
                  <button className='zmaz' onClick={() => handleDelete(level.id)}><FontAwesomeIcon icon={faTrash}/></button>
                  <Link to={`${level.id}`}><button className='uprav'><FontAwesomeIcon icon={faEdit}/></button></Link>
                </div> 
            </div>  
          ))}
          </div>
        </div>

      </div>
  )
}

export default AdminLevelUpdate;