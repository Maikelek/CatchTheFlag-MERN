import React from 'react'
import { useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axios from "axios"
import config from '../../config/config';

import { faArrowTrendDown, faArrowTrendUp, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const UserController = () => {
  
    let [users, setUsers] = useState ( [] );
    let [sorted, setSorted] = useState ( 0 );
    const [logged, setLogged] = useState ( 0 );
    const [searchTerm, setSearchTerm] = useState('');

    const nav = useNavigate(); 

    const filteredUsers = users.filter((user) => {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    useEffect(() => {
      axios.get(`${config.apiUrl}/auth`, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
        .then(res => res.data)
        .then(response => {
          if (response.auth !== true || response.user.role !== "admin" ) {
            nav("/");
          } else {
            setLogged(response.user.id);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }, [nav]);


    useEffect( () => {  
      if (logged >= 1 ) {               
        const fetchAllUsers = async () => {
            try{
                const res = await axios.get(`${config.apiUrl}/admin/user`, {
                  withCredentials: true
                })
                setUsers(res.data)
            }catch(error) {
                console.log(error)
            }
        }
        fetchAllUsers()
      }
    },[logged])


    const handleDelete = async (id) => {         
      const confirmed = window.confirm("Naozaj chceš zmazať tohto používateľa?");
      if (confirmed) {
        try {
          await axios.delete(`${config.apiUrl}/admin/user/${id}`, {
            withCredentials: true
          });
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      }
    };

  const sortUp = () => {
    setSorted(1);
  }

  const sortDown = () => {
    setSorted(2);
  }

  useEffect(() => {
    if (searchTerm.length > 0) {
      setSorted(3);
    } else {
      setSorted(0);
    }
  }, [searchTerm]);


  return (

    <div> 

    <div className='content'>
      <div className="spotUpdate">
        <h1>Managing users</h1>
        <div className="update">
          <form >
          <input type="text" placeholder='Search' className='searcher' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </form>
          <div>
            <button className='zmaz' onClick={sortUp}><FontAwesomeIcon icon={faArrowTrendDown} /></button>
            <button className='uprav' onClick={sortDown}><FontAwesomeIcon icon={faArrowTrendUp} /></button>
          </div>
        </div>

        
        {sorted === 0 ? users.map(user => (
            <div className='update' key={user.id}>
                <h1>{user.name} {user.role === "admin" ? <i className='info'>admin</i> : null}</h1>
                <div>
                  <Link to={`${user.id}`}><button className='uprav'><FontAwesomeIcon icon={faEdit}/></button></Link>
                  <button className='zmaz' onClick={() => handleDelete(user.id)}><FontAwesomeIcon icon={faTrash}/></button>
                </div> 
            </div>  
          )) : null}

        {sorted === 1 ? users.sort((a, b) => (a.points < b.points) ? 1: -1).map(user => (
            <div className='update' key={user.id}>
                <h1>{user.name} {user.role === "admin" ? <i className='info'>admin</i> : null}</h1>
                <div>
                  <Link to={`${user.id}`}><button className='uprav'><FontAwesomeIcon icon={faEdit}/></button></Link>
                  <button className='zmaz' onClick={() => handleDelete(user.id)}><FontAwesomeIcon icon={faTrash}/></button>
                </div> 
            </div>  
          )) : null}


        {sorted === 2 ? users.sort((a, b) => (a.points < b.points) ? 1: -1).reverse().map(user => (
            <div className='update' key={user.id}>
            <h1>{user.name} {user.role === "admin" ? <i className='info'>admin</i> : null}</h1>
            <div>
              <Link to={`${user.id}`}><button className='uprav'><FontAwesomeIcon icon={faEdit}/></button></Link>
              <button className='zmaz' onClick={() => handleDelete(user.id)}><FontAwesomeIcon icon={faTrash}/></button>
            </div> 
        </div>  
      )) : null}

      {sorted === 3 ? filteredUsers.map(user => (
          <div className='update' key={user.id}>
            <h1>{user.name} {user.role === "admin" ? <i className='info'>admin</i> : null}</h1>
            <div>
              <Link to={`${user.id}`}><button className='uprav'><FontAwesomeIcon icon={faEdit}/></button></Link>
              <button className='zmaz' onClick={() => handleDelete(user.id)}><FontAwesomeIcon icon={faTrash}/></button>
            </div> 
        </div>  
      )) : null}

          </div>
      </div>

    </div>
  )

}

export default UserController;
