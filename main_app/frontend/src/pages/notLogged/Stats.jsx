import React from 'react';
import { useEffect, useState} from 'react'

import axios from "axios"

import Header from '../components/Header';

const Stats = () => {

    let [users, setUsers] = useState ( [] );
    

    useEffect( () => {                
        const fetchAllUsers = async () => {
            try{
                const res = await axios.get("http://localhost:8800/user/")
                setUsers(res.data)
            }catch(error) {
                console.log(error)
            }
        }
        fetchAllUsers()
    },[])

    users = users.sort((a, b) => (a.points < b.points && a.points > 0 && b.points > 0 ) ? 1: -1)
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