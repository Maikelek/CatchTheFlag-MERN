import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import Header from '../components/Header';
import axios from 'axios';
import config from '../../config/config';
import { faExclamationCircle, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = () => {

    const { user, setUser } = useUser();
    const [msg, setMsg] = useState({});
    const [points, setPoints] = useState(0);
    const [profileLoading, setProfileLoadingPoints] = useState(false);
    const email = user.email ? user.email : "";

    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const profileResponse = await axios.post(`${config.apiUrl}/profile`, { email }, {
                    withCredentials: true
                  });
                if(profileResponse.data[0] && profileResponse.data[0].points) {
                    setPoints(profileResponse.data[0].points);
                }

            } catch(error) {
                console.log(error);
            }
        }
        fetchPoints();
    }, [email], [])

    const handleClick = async (e) => {
        e.preventDefault();
        setMsg({});

        try {
            const response = await axios.put(
                `${config.apiUrl}/profile`,
                { user },
                { withCredentials: true }
            );
            if (response.data) {
                if (response.data.messageGreen) {
                    setProfileLoadingPoints(true);
                    setTimeout(() => {
                        setProfileLoadingPoints(false);
                        setMsg(response.data);
                    }, 2100);
                } else {
                    setMsg(response.data);
                }
                if (response.data.points) {
                    setPoints(response.data.points);
                }
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred while updating your profile.");
        }
    };

    return (
        <div className='container'>
            <Header />

            <div className="holder">
                <div className="profile">
                    <h1 className='profileCenter'>PROFILE</h1>

                    <form onSubmit={handleClick}>
                        <div className="nameRow">
                            <div className="inputWithLabelProfile">
                                <label className="labelForInput">Nick</label>
                                <input
                                    className="inputFieldProfile"
                                    type="text"
                                    value={user?.name || ""}
                                    autoComplete="off"
                                    name='name'
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                />
                            </div>

                            <div className="inputWithLabelProfile">
                                <label className="labelForInput">Email</label>
                                <input
                                    className="inputFieldProfile"
                                    type="text"
                                    value={user?.email || ""}
                                    autoComplete="off"
                                    name='email'
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="nameRow">
                            <div className="inputWithLabelProfile">
                                <label className="labelForInput">Password</label>
                                <input
                                    className="inputFieldProfile"
                                    type="password"
                                    autoComplete="off"
                                    name='pass'
                                    onChange={(e) => setUser({ ...user, pass: e.target.value })}
                                />
                            </div>

                            <div className="inputWithLabelProfile">
                                <label className="labelForInput">Repeat Password</label>
                                <input
                                    className="inputFieldProfile"
                                    type="password"
                                    autoComplete="off"
                                    name='passRep'
                                    onChange={(e) => setUser({ ...user, passRep: e.target.value })}
                                />
                            </div>
                        </div>

                        <h2 className='profileCenter'>Your points: <i className='points'>{points}</i></h2>

                        <div className="centerButton">

                            {!profileLoading ? 
                                <button className='profileButton'>Update yourself</button> :
                                <p className='loader' style={{fontSize: "1.5rem", marginTop: "10px", marginBottom: "10px"}}></p>
                            }

                            {msg.message ? (
                                <h5 className='loginDangerLabel'>
                                    <FontAwesomeIcon icon={faExclamationCircle} /> {msg.message}
                                </h5>
                            ) : null}

                            {msg.messageGreen ? (
                                <h5 className="loginSucessLabel">
                                    <FontAwesomeIcon icon={faThumbsUp} /> {msg.messageGreen}
                                </h5>
                            ) : null}

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
