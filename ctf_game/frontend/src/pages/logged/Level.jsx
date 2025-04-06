import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Header from '../components/Header';
import config from '../../config/config';
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Level = () => {
  const location = useLocation();  
  const id = location.pathname.split("/")[2]; 
  const nav = useNavigate(); 

  const { user } = useUser();
  const [levelData, setLevelData] = useState([]);
  const [answer, setAnswer] = useState("");
  const [msg, setMsg] = useState({});

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await axios.get(`${config.apiUrl}/level/${id}`, {
          withCredentials: true,
        });
        setLevelData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllData();
    }, [id, user?.id, nav]);

  const handleChange = (e) => {
    setAnswer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${config.apiUrl}/answer`,
        { id, logged: user?.id, answer },
        { withCredentials: true }
      );
      if (response.data.message === "ok") {
        nav("/Levels");
      } else {
        setMsg(response.data);
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred.");
    }
  };

  return (
    <div className='container'>
      <Header />
      <div className="holder">
        {levelData.map((level) => (
          <div className='level' key={level.id}>
            <h1>{level.title}</h1>
            <h5>Worth {level.points} points</h5>

            <div className='hint'>
              <p>
                {level.hint ? (
                  <label>
                    Hint: {level.hint}{" "}
                    {level.link ? (
                      <a
                        href={level.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        id='link'
                      >
                        LINK
                      </a>
                    ) : null}
                  </label>
                ) : null}
              </p>
            </div>
            <form onSubmit={handleClick}>
              <div className='levelInput'>
                <input
                  type="text"
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
            {msg.message ? (
              <h4 className='loginDangerLabel' style={{ marginTop: "1rem" }}>
                <FontAwesomeIcon icon={faExclamationCircle} /> {msg.message}
              </h4>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Level;
