import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import Header from '../components/Header';
import axios from 'axios';
import config from '../../config/config';
import { faExclamationCircle, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profil = () => {
    const { user, setUser } = useUser();
    const [msg, setMsg] = useState({});
    const [points, setPoints] = useState(user?.points || 0);

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `${config.apiUrl}/profil`,
                { user },
                { withCredentials: true }
            );
            if (response.data) {
                setMsg(response.data);
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
                <div className="profil">
                    <h1 className='profilCenter'>PROFILE</h1>

                    <form onSubmit={handleClick}>
                        <div className="nameRow">
                            <div className="inputWithLabelProfil">
                                <label className="labelForInput">Nick</label>
                                <input
                                    className="inputFieldProfil"
                                    type="text"
                                    value={user?.name || ""}
                                    autoComplete="off"
                                    name='name'
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                />
                            </div>

                            <div className="inputWithLabelProfil">
                                <label className="labelForInput">Email</label>
                                <input
                                    className="inputFieldProfil"
                                    type="text"
                                    value={user?.email || ""}
                                    autoComplete="off"
                                    name='email'
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="nameRow">
                            <div className="inputWithLabelProfil">
                                <label className="labelForInput">Password</label>
                                <input
                                    className="inputFieldProfil"
                                    type="password"
                                    autoComplete="off"
                                    name='pass'
                                    onChange={(e) => setUser({ ...user, pass: e.target.value })}
                                />
                            </div>

                            <div className="inputWithLabelProfil">
                                <label className="labelForInput">Repeat Password</label>
                                <input
                                    className="inputFieldProfil"
                                    type="password"
                                    autoComplete="off"
                                    name='passRep'
                                    onChange={(e) => setUser({ ...user, passRep: e.target.value })}
                                />
                            </div>
                        </div>

                        <h2 className='profilCenter'>Your points: <i className='points'>{points}</i></h2>

                        <div className="centerButton">
                            <button className='profilButton'>Update yourself</button>
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

export default Profil;
