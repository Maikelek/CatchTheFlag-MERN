import axios from 'axios';
import React from 'react'; 
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import config from '../../config/config';

import l3 from '../../images/l3.JPEG';
import l4 from '../../images/l4.JPEG';
import petrabottova2001 from '../../images/petrabottova2001.png';


import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Level = () => {

  const location = useLocation();  
  const id = location.pathname.split("/")[2]; 
  const nav = useNavigate(); 

  const [levelData, setLevelData] = useState ( [] );
  const [logged, setLogged] = useState(0);
  const [answer, setAnswer] = useState("");
  const [msg, setMsg] = useState({});

  useEffect(() => {
    fetch(`${config.apiUrl}/auth`, {
        method:'GET',
        headers: {
            'Content-Type':'application/json'
        },
        credentials: 'include'
        }).then(res => res.json()) 
        .then(response => {
          if( response.auth === true ) {
            setLogged(response.user.id);
          } else {
            nav("/"); 
          }
        })
       
    },[nav])
    
    useEffect(() => {
      if (logged >= 1) {
        const fetchAllData = async () => {
          try {
            const res = await axios.get(`${config.apiUrl}/level/${id}`, {
              withCredentials: true
            });
            setLevelData(res.data)
          } catch (error) {
            console.log(error)
          }
        }
        fetchAllData()
      }
    }, [id, logged])

    const handleChange = (e) => {
        setAnswer(prev => ({...prev, [e.target.name]: e.target.value})); 
      };

      const handleClick = async e => {   
        e.preventDefault();
      
        try {
          const response = await axios.post(
            `${config.apiUrl}/answer`,
            { id, logged, answer },
            {
              withCredentials: true,
            }
          );
          if (response.data.message === "ok") {
            nav("/Levels");
          } else {
            setMsg(response.data);
          }
        } catch (error) {
          console.log(error);
          alert(error);
        }
      }
      


  return (

  <div className='container'>
        
        <Header />
        <div className="holder">
          {levelData.map(level => (
              <div className='level' key={level.id}>
                  <h1>{level.title}</h1>
                  <h5>Worth {level.points} points</h5>
                  
                  <div className='pomocka'>
                      <p>{level.hint ? <label>Hint: {level.hint} {level.link ? <a href={level.link} target="_blank" rel="noopener noreferrer" id='odkaz'>LINK</a> : null}</label> : null}</p>
                      {level.id === 1 ? <div dangerouslySetInnerHTML={{__html: "<!-- heslo je /l1-z4c1470k\\ -->"}}/>: null }
                  </div>
                  <form onSubmit={handleClick}>
                    <div className='levelInput'>
                      <input type="text" 
                        placeholder='Insert password: ' 
                        name='answer'
                        autoComplete='off'
                        onChange={handleChange}
                      />
                    </div>
                      <div className='button'>
                          <button className='signin'>Send</button>
                      </div>
                  </form>
                  {msg.message ? <h4 className='loginDangerLabel' style={{marginTop: "1rem"}}><FontAwesomeIcon icon={faExclamationCircle}/> {msg.message}</h4>: null }
              </div>  
          ))}
        </div>
    </div>
  )
}

export default Level