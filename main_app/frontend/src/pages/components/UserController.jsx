import React from 'react'
import { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import axios from "axios"

import { faArrowTrendDown, faArrowTrendUp, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const UserController = () => {
  
    let [users, setUsers] = useState ( [] );
    let [sorted, setSorted] = useState ( 0 );

    useEffect( () => {                
        const fetchAllUsers = async () => {
            try{
                const res = await axios.get("http://localhost:8800/admin/user")
                setUsers(res.data)
            }catch(error) {
                console.log(error)
            }
        }
        fetchAllUsers()
    },[])
  
    const handleDelete = async (id) => {         
      try {
        await axios.delete(`http://localhost:8800/admin/user/${id}`);
        window.location.reload()
      } catch (err) {
        console.log(err);
      }
    };

  const sortUp = () => {
    setSorted(1);
  }

  const sortDown = () => {
    setSorted(2);
  }

  return (

    <div> 

    <div className='content'>
      <div className="spotUpdate">
        <h1>Moderacia používateľov</h1>
        <div className="update">
          <form action="">
            <input type="text" name="" id="" />
          </form>
          <div>
            <button className='zmaz' onClick={sortUp}><FontAwesomeIcon icon={faArrowTrendDown} /></button>
            <button className='uprav' onClick={sortDown}><FontAwesomeIcon icon={faArrowTrendUp} /></button>
          </div>
        </div>

        
        {sorted === 0 ? users.map(user => (
            <div className='update' key={user.id}>
                <h1>{user.name} : {user.points}b</h1>
                <div>
                  <button className='zmaz' onClick={() => handleDelete(user.id)}><FontAwesomeIcon icon={faTrash}/></button>
                  <Link to={`${user.id}`}><button className='uprav'><FontAwesomeIcon icon={faEdit}/></button></Link>
                </div> 
            </div>  
          )) : null}

        {sorted === 1 ? users.sort((a, b) => (a.points < b.points) ? 1: -1).map(user => (
            <div className='update' key={user.id}>
                <h1>{user.name} : {user.points}b</h1>
                <div>
                  <button className='zmaz' onClick={() => handleDelete(user.id)}><FontAwesomeIcon icon={faTrash}/></button>
                  <Link to={`${user.id}`}><button className='uprav'><FontAwesomeIcon icon={faEdit}/></button></Link>
                </div> 
            </div>  
          )) : null}


        {sorted === 2 ? users.sort((a, b) => (a.points < b.points) ? 1: -1).reverse().map(user => (
            <div className='update' key={user.id}>
            <h1>{user.name} : {user.points}b</h1>
            <div>
              <button className='zmaz' onClick={() => handleDelete(user.id)}><FontAwesomeIcon icon={faTrash}/></button>
              <Link to={`${user.id}`}><button className='uprav'><FontAwesomeIcon icon={faEdit}/></button></Link>
            </div> 
        </div>  
      )) : null}

          </div>
      </div>

    </div>
  )

}

export default UserController;