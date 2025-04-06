import React from 'react';
import { useEffect, useState} from 'react'

import axios from "axios"

import Header from '../components/Header';
import config from '../../config/config';

const Stats = () => {

    let [users, setUsers] = useState ( [] );

    useEffect( () => {                
      const fetchAllUsers = async () => {
          try{
              const res = await axios.get(`${config.apiUrl}/user/`, {
                withCredentials: true
              });
              setUsers(res.data)
          }catch(error) {
              console.log(error)
          }
      }
      fetchAllUsers()
    }, [])

    users = users.sort((a, b) => (a.points < b.points) ? 1: -1)
    users = users.filter((a => a.points > 0 && a.role !== "admin"));
  return (
    <div>
        <Header />
    

        <div className='container'>
    
        <div className='home'>

            <div className="statHolder">
                <h1 style={{textAlign:"center"}}>Stats</h1>
                <h1 style={{textAlign:"center", marginTop:"1rem"}}>Player's points</h1>
                {users.filter((a => a.points > 0 && a.role !== "admin")).length > 0 ?  users.map(user => (
                        <div className='stats' key={user.id}>
                        <h1>{user.name}</h1>
                        <h1 className='points'>{user.points}p</h1>
                    </div>  
                )) : null}

            </div>

        </div>

        </div>
    
    </div>

  )
}

export default Stats;
