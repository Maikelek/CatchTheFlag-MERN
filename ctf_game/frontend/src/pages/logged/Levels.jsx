import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import config from '../../config/config';

const Levels = () => {
  const { user } = useUser();
  const [levels, setLevels] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    if (user?.id) {
      const fetchAllLevels = async () => {
        try {
          const response = await axios.post(
            `${config.apiUrl}/answer/done`,
            { id: user.id },
            { withCredentials: true }
          );
          setDone(response.data.done);
          setLevels(response.data.levels);
        } catch (error) {
          console.log(error);
        }
      };
      fetchAllLevels();
    }
  }, [user?.id]);

  return (
    <div className='container'>
      <Header />
      <div className='holder'>
        <div className='levels'>
          <ul>
            {levels.map(level => (
              <div
                className={
                  done.findIndex(doneLevel => doneLevel.levelID === level.id) >= 0
                    ? 'doneBorder'
                    : 'levelBorder'
                }
                key={level.id}
              >
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
