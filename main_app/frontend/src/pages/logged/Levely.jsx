import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'

const Levely = () => {


    const [id, setID] = useState ( 0 )

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
              } else {
                setID(response.user[0].id)
              } 
            })
           
        },[nav])

    const [levely, setLevely] = useState ( [] )
    const [done, setDone] = useState ( [] )

    useEffect( () => {                
        const fetchAllLevely = async () => {
            try{
                const response = await axios.post(" http://localhost:8800/answer/done", {id})
                setDone(response.data.done)
                setLevely(response.data.levels)
            }catch(error) {
                console.log(error)
            }
        }
        fetchAllLevely()
    },[id])
    

    return (
        <div className='container'>

            <Header />

            <div className='levely'>
            <ul>
            {levely.map(level => (

               
                <div className={done.findIndex((doneLevel) => doneLevel.levelID===level.id) >= 0 ? "doneHranica" : "levelHranica"} key={level.id}>
                    <li><Link to={`/level/${level.id}`} 
                            className="link"
                            title={level.title}>
                            {level.title}
                        </Link></li>
                </div> 

            ))}
            </ul>

            </div>

        </div>
    )
}
export default Levely

