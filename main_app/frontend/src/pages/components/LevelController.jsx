import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import axios from "axios"
import config from '../../config/config';

import { faArrowTrendDown, faArrowTrendUp, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const LevelController = () => {
  
  let [levely, setLevely] = useState ( [] )
  let [sorted, setSorted] = useState ( 0 )
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLevely = levely.filter((level) => {
    return level.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect( () => {                
      const fetchAllLevely = async () => {
          try{
              const res = await axios.get(`${config.apiUrl}/admin/level`)
              setLevely(res.data)
          }catch(error) {
              console.log(error)
          }
      }
      fetchAllLevely()
  },[])


  const handleDelete = async (id) => {         
    const confirmed = window.confirm("Naozaj chceš zmazať tento level?");
    if (confirmed) {
      try {
        await axios.delete(`${config.apiUrl}/admin/level/${id}`);
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
        <h1>Moderacia levelov</h1>
        <div className="update">
          <form>
            <input type="text" placeholder='Hľadaj' className='searcher' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          </form>
          <div>
            <button className='zmaz' onClick={sortUp}><FontAwesomeIcon icon={faArrowTrendDown} /></button>
            <button className='uprav' onClick={sortDown}><FontAwesomeIcon icon={faArrowTrendUp} /></button>
          </div>
        </div>

        
        {sorted === 0 ? levely.map(level => (
            <div className='update' key={level.id}>
                <h1>{level.title}</h1>
                <div>
                <button className='zmaz' onClick={() => handleDelete(level.id)}><FontAwesomeIcon icon={faTrash}/></button>
                <Link to={`${level.id}`}><button className='uprav'><FontAwesomeIcon icon={faEdit}/></button></Link>
                </div> 
            </div>  
        )) : null}

        {sorted === 1 ? levely.sort((a, b) => (a.points < b.points) ? 1: -1).map(level => (
            <div className='update' key={level.id}>
                <h1>{level.title}</h1>
                <div>
                <button className='zmaz' onClick={() => handleDelete(level.id)}><FontAwesomeIcon icon={faTrash}/></button>
                <Link to={`${level.id}`}><button className='uprav'><FontAwesomeIcon icon={faEdit}/></button></Link>
                </div> 
            </div>  
        )) : null}


        {sorted === 2 ? levely.sort((a, b) => (a.points < b.points) ? 1: -1).reverse().map(level => (
            <div className='update' key={level.id}>
                <h1>{level.title}</h1>
                <div>
                <button className='zmaz' onClick={() => handleDelete(level.id)}><FontAwesomeIcon icon={faTrash}/></button>
                <Link to={`${level.id}`}><button className='uprav'><FontAwesomeIcon icon={faEdit}/></button></Link>
                </div> 
            </div>  
        )) : null}


      {sorted === 3 ? filteredLevely.map(level => (
          <div className='update' key={level.id}>
            <h1>{level.title}</h1>
            <div>
            <button className='zmaz' onClick={() => handleDelete(level.id)}><FontAwesomeIcon icon={faTrash}/></button>
            <Link to={`${level.id}`}><button className='uprav'><FontAwesomeIcon icon={faEdit}/></button></Link>
            </div> 
        </div>  
      )) : null}


          </div>
      </div>

    </div>
  )

}

export default LevelController;