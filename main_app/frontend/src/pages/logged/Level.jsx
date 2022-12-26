import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from '../components/Header';

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
    fetch('http://localhost:8800/auth', {
        method:'GET',
        headers: {
            'Content-Type':'application/json'
        },
        credentials: 'include'
        }).then(res => res.json()) 
        .then(response => {
          console.log(response)
          if( response.auth === true ) {
            setLogged(response.user[0].id);
          } else {
            nav("/"); 
          }
        })
       
    },[nav])

    useEffect( () => {                
        const fetchAllData = async () => {
            try{
                const res = await axios.get(`http://localhost:8800/level/${id}`)
                setLevelData(res.data)
            }catch(error) {
                console.log(error)
            }
        }
        fetchAllData()
    },[id])

    const handleChange = (e) => {
        setAnswer(prev => ({...prev, [e.target.name]: e.target.value})); 
      };

      const handleClick = async e => {   
        e.preventDefault();
       
        fetch('http://localhost:8800/answer', {
          method:'POST',
          body: JSON.stringify({id, logged, answer}), 
          headers: {
              'Content-Type':'application/json'
          }
          }).then(res => res.json()) 
          .then(response => {
            console.log(response)
            if (response.message === "ok") {
              nav("/levely"); 
            } else {
              setMsg(response)
            }
          })
          .catch(err => {
              console.log(err);
              alert(err);
          });
      }


  return (

    <div className='container'>
        
        <Header />

        {levelData.map(level => (
            <div className='level' key={level.id}>
                <h1>{level.title}</h1>
                <h5>Za {level.points} bodov</h5>
                {level.id === 5 ? <img src={petrabottova2001} id='fotka' alt='petrabottova2001' />: null }
                {level.picture ? <img src={level.picture} id='fotka' alt='levelFoto'/> : null }
                <div className='pomocka'>
                    <p>{level.hint ? <label>Pomôcka je: {level.hint} {level.link ? <a href={level.link} target="_blank" rel="noopener noreferrer" id='odkaz'>LINK</a> : null}</label> : null}</p>
                    {level.id === 1 ? <div dangerouslySetInnerHTML={{__html: "<!-- heslo je /l1-z4c1470k\\ -->"}}/>: null }
                    {level.id === 3 ? <img src={l3} alt='l3'/>: null }
                    {level.id === 4 ? <img src={l4} alt='l4' />: null }
                </div>
                <form onSubmit={handleClick}>
                    <input type="text" 
                        placeholder='Vlož heslo: ' 
                        name='answer'
                        autoComplete='off'
                        onChange={handleChange}/>
                    <div className='button'>
                        <button className='signin'>Potvrď</button>
                    </div>
                </form>
                {msg.message ? <label className='loginDangerLabel'><FontAwesomeIcon icon={faExclamationCircle}/> {msg.message}</label>: null }
            </div>  
        ))}
    </div>
  )
}

export default Level