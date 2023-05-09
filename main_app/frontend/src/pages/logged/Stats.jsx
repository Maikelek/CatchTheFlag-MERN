import React from 'react';
import { useEffect, useState} from 'react'

import axios from "axios"

import Header from '../components/Header';
import config from '../../config/config';
import { useNavigate } from 'react-router-dom';

const Stats = () => {

    let [users, setUsers] = useState ( [] );
    const [id, setID] = useState ( 0 );
    const nav = useNavigate();

    useEffect(() => {
        fetch(`${config.apiUrl}/auth`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
          .then(res => res.json())
          .then(response => {
            if (response.auth === true) {
              setID(response.user.id);
            } else {
              nav("/");
            }
          })
      
      }, [nav])
    

    useEffect( () => {                
        if (id >= 1) {
            const fetchAllUsers = async () => {
                try{
                    const res = await axios.get(`${config.apiUrl}/user/`)
                    setUsers(res.data)
                }catch(error) {
                    console.log(error)
                }
            }
            fetchAllUsers()
        }
    },[id])

    users = users.sort((a, b) => (a.points < b.points) ? 1: -1)
    users = users.filter((a => a.points > 0 && a.role !== "admin"));
  return (
    <div>
        <Header />
    

        <div className='container'>
    
        <div className='domov'>

            <div className="statHolder">
                <h1 style={{textAlign:"center"}}>Štatistika</h1>
                <h1 style={{textAlign:"center", marginTop:"1rem"}}>Body hráčov</h1>
                {users.filter((a => a.points > 0 && a.role !== "admin")).length > 0 ?  users.map(user => (
                        <div className='stats' key={user.id}>
                        <h1>{user.name}</h1>
                        <h1 className='points'>{user.points}b</h1>
                    </div>  
                )) : null}
                
        

            </div>

        </div>

        </div>
    
    </div>

  )
}

export default Stats;
