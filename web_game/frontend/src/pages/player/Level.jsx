import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Header from '../components/Header'

import l3 from '../../fotky/l3.JPEG'
import l4 from '../../fotky/l4.JPEG'
import petrabottova2001 from '../../fotky/petrabottova2001.png'

const Level = () => {

  const [levelData, setLevelData] = useState ( [] )

  const location = useLocation();  
  const id = location.pathname.split("/")[2]; 

    useEffect( () => {                
        const fetchAllData = async () => {
            try{
                const res = await axios.get(`http://localhost:8800/level/display/${id}`)
                setLevelData(res.data)
            }catch(error) {
                console.log(error)
            }
        }
        fetchAllData()
    },)

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
                    <p>{level.hint ? <p>Pomôcka je: {level.hint} {level.link ? <a href={level.link} target="_blank" rel="noopener noreferrer" id='odkaz'>LINK</a> : null}</p> : null}</p>
                    {level.id === 1 ? <div dangerouslySetInnerHTML={{__html: "<!-- heslo je /l1-z4c1470k\\ -->"}}/>: null }
                    {level.id === 3 ? <img src={l3} alt='l3'/>: null }
                    {level.id === 4 ? <img src={l4} alt='l4' />: null }
                </div>
                <input type="text" placeholder='Vlož heslo: ' name='password'/>
                <div className='button'>
                    <button className='signin'>Potvrď</button>
                </div>
            </div>  
        ))}
    </div>
  )
}

export default Level