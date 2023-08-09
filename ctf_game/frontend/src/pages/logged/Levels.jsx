import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import config from '../../config/config';

const Levels = () => {
  const [id, setID] = useState(0);
  const [levely, setLevely] = useState([]);
  const [done, setDone] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    fetch(`${config.apiUrl}/auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
        if (response.auth === true) {
          setID(response.user.id);
          console.log(response.user);
        } else {
          nav('/');
        }
      });
  }, [nav]);

  useEffect(() => {
    if (id >= 1) {
      const fetchAllLevely = async () => {
        try {
          const response = await axios.post(`${config.apiUrl}/answer/done`, { id }, {
            withCredentials: true
          });
          setDone(response.data.done);
          setLevely(response.data.levels);
        } catch (error) {
          console.log(error);
        }
      };

      fetchAllLevely();
    }
  }, [id]);

  return (
    <div className='container'>
      <Header />
      <div className='holder'>
        <div className='levely'>
          <ul>
            {levely.map(level => (
              <div className={done.findIndex(doneLevel => doneLevel.levelID === level.id) >= 0 ? 'doneHranica' : 'levelHranica'} key={level.id}>
                <li>
                  <Link to={`/level/${level.id}`} className='link' title={level.title}>
                    {level.title}
                  </Link>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Levels;
