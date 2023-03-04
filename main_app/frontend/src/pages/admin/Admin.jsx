import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import AdminNav from '../components/AdminNav';
import config from '../../config/config';

const Admin = () => {

  const nav = useNavigate(); 

  let [levely, setLevely] = useState ( [] )
  let [users, setUsers] = useState ( [] )


  const adminUsers = users.filter(user => user.role === 'admin');
  const playerUsers = users.filter(user => user.role === 'hrac');

  const totalPoints = levely.reduce((sum, currentValue) => {
    return sum + currentValue.points;
  }, 0);

  const userWithMostPoints = playerUsers.reduce((prevUser, currentUser) => {
    return prevUser.points > currentUser.points ? prevUser : currentUser;
  }, playerUsers[0]);
  

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

    useEffect(() => {
      const fetchAllData = async () => {
        try {
          const levelRes = await axios.get(`${config.apiUrl}/admin/level`)
          const userRes = await axios.get(`${config.apiUrl}/admin/user`)
          setLevely(levelRes.data)
          setUsers(userRes.data)
        } catch (error) {
          console.log(error)
        }
      }
      fetchAllData()
    }, [])

  return (
    <div>
      <AdminNav />
      <div className='content'>
        <h1 style={{textAlign: "center", margin: "0.5rem", letterSpacing: "1px", fontSize: "2.5rem", fontWeight: "50"}}>Moderuj web pomocou tohto rozhrania</h1>

        <div className="spotUpdateRow">

          <div className="updateSmall">
            <h1>Počet uživateľov: <i className='info'>{users.length}</i></h1>
          </div>

          <div className="updateSmall">
            <h1>Počet levelov: <i className='info'>{levely.length}</i></h1>
          </div>

          <div className="updateSmall">
            <h1>Počet adminov: <i className='info'>{adminUsers.length}</i></h1>
          </div>

          <div className="updateSmall">
            <h1>Počet hráčov: <i className='info'>{playerUsers.length}</i></h1>
          </div>

         {userWithMostPoints && userWithMostPoints.points !== 0 ? 
            <div className="updateSmall">
              <h1>Najúspešnejší hráč: <i className='info'>{userWithMostPoints.name}:{userWithMostPoints.points}b</i></h1>
            </div>
                 
          :null}

          <div className="updateSmall">
            <h1>Max počet bodov: <i className='info'>{totalPoints}</i></h1>
          </div>

        </div>
      </div>

      </div>
  )
}

export default Admin;