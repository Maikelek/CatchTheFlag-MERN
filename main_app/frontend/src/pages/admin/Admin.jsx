import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import AdminNav from '../components/AdminNav';


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

    useEffect(() => {
      const fetchAllData = async () => {
        try {
          const levelRes = await axios.get("http://localhost:8800/admin/level")
          const userRes = await axios.get("http://localhost:8800/admin/user")
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
        <h1 style={{textAlign: "center", margin: "0.5rem"}}>Moderuj web pomocou tohto rozhrania</h1>

        <div className="spotUpdateRow">

          <div className="updateSmall">
            <h1>Počet uživateľov: {users.length}</h1>
          </div>

          <div className="updateSmall">
            <h1>Počet levelov: {levely.length}</h1>
          </div>

          <div className="updateSmall">
            <h1>Počet adminov: {adminUsers.length}</h1>
          </div>

          <div className="updateSmall">
            <h1>Počet hráčov: {playerUsers.length}</h1>
          </div>

         {userWithMostPoints ? 
            <div className="updateSmall">
              <h1>Najúspešnejší hráč: {userWithMostPoints.name}:{userWithMostPoints.points}b</h1>
            </div>
                 
          :null}

          <div className="updateSmall">
            <h1>Max počet bodov: {totalPoints}</h1>
          </div>

        </div>
      </div>

      </div>
  )
}

export default Admin;