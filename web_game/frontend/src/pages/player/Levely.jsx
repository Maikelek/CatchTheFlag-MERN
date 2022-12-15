import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import Header from '../components/Header'
import { Link } from 'react-router-dom'

const Levely = () => {

    const [levely, setLevely] = useState ( [] )

    useEffect( () => {                
        const fetchAllLevely = async () => {
            try{
                const res = await axios.get("http://localhost:8800/level")
                setLevely(res.data)
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