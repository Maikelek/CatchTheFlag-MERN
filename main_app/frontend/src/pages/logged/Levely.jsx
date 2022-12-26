import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'

const Levely = () => {



    const nav = useNavigate(); 

    useEffect(() => {
        fetch('http://localhost:8800/auth', {
            method:'GET',
            headers: {
                'Content-Type':'application/json'
            },
            credentials: 'include'
            }).then(res => res.json()) 
            .then(response => {
              if( response.auth === false ) {
                nav("/"); 
              }  
            })
           
        },[nav])

    const [levely, setLevely] = useState ( [] )

    useEffect( () => {                
        const fetchAllLevely = async () => {
            try{
                const response = await axios.get("http://localhost:8800/level")
                setLevely(response.data)
            }catch(error) {
                console.log(error)
            }
        }
        fetchAllLevely()
    },[])
    

    return (
        <div className='container'>

            <Header />

            <div className='levely'>
            <ul>
            {levely.map(level => (
                  <div className='levelHranica' key={level.id}>
                    <li><Link to={`/level/${level.id}`} className='link' title={level.title}>{level.title}</Link></li>
                  </div>  
                ))}
            </ul>

            </div>

        </div>
    )
}
export default Levely