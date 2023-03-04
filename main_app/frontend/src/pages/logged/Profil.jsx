import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import config from '../../config/config';

import { faExclamationCircle, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profil = () => {

    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState({});
    const [points, setPoints] = useState(0);
    const [user, setUser] = useState({   
        id: "",
        name: "",
        email: "",
        role: "",
        pass: "",
        passRep: ""
      })

    const nav = useNavigate(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authResponse = await axios.get(`${config.apiUrl}/auth`, {
                    headers: {
                        'Content-Type':'application/json'
                    },
                    withCredentials: true
                });
                if( authResponse.data.auth ) {
                    setUser(authResponse.data.user);
                    setEmail(authResponse.data.user.email);
                    const profileResponse = await axios.post(`${config.apiUrl}/profil`, {email});
                    if(profileResponse.data[0] && profileResponse.data[0].points) {
                        setPoints(profileResponse.data[0].points);
                    }
                } else {
                    nav("/"); 
                }
            } catch(error) {
                console.log(error);
            }
        }
        fetchData();
    }, [nav, email])

    const handleClick = async e => {   
        e.preventDefault();
    
        try {
            const response = await axios.put(`${config.apiUrl}/profil`, {user});
            if (response.data) {
                setMsg(response.data)
            }
        } catch(error) {
            console.log(error);
            alert(error);
        }
    }

  return (

    <div className='container'>

        <Header />

        <div className="holder">
            <div className="profil">
                <h1 className='profilCenter'>PROFIL</h1>   
                
                <form onSubmit={handleClick}>    
                    <div className="nameRow">

                        <div className="inputWithLabelProfil">
                            <label className="labelForInput" >Meno</label>
                            <input 
                                className="inputFieldProfil"
                                type="text"
                                value={user.name}
                                autoComplete="off" 
                                name='name'
                                onChange={(e) => {
                                    setUser({...user, name: e.target.value})
                                }}/>
                                
                        </div>

                        <div className="inputWithLabelProfil">
                            <label className="labelForInput" >Email</label>
                            <input 
                                className="inputFieldProfil"
                                type="text"
                                value={user.email}
                                autoComplete="off" 
                                name='email'
                                onChange={(e) => {
                                    setUser({...user, email: e.target.value})
                                }}/>
                        </div>

                        </div>

                        <div className="nameRow">

                        <div className="inputWithLabelProfil">
                            <label className="labelForInput">Heslo</label>
                            <input 
                                className="inputFieldProfil"
                                type="password"
                                autoComplete="off" 
                                name='pass'
                                onChange={(e) => {
                                    setUser({...user, pass: e.target.value})
                                }}/>
                        </div>

                        <div className="inputWithLabelProfil">
                            <label className="labelForInput"> Zopakuj Heslo</label>
                            <input 
                                className="inputFieldProfil"
                                type="password"
                                autoComplete="off" 
                                name='passRep'
                                onChange={(e) => {
                                    setUser({...user, passRep: e.target.value})
                                }}/>
                        </div>
                    </div>
                    <h2 className='profilCenter'>Počet bodov: <i className='points'>{points}</i></h2>
                    
                    <div className="centerButton">
                        <button className='profilButton'>Aktualizuj</button>
                        {msg.message ? <h5 className='loginDangerLabel'><FontAwesomeIcon icon={faExclamationCircle}/> {msg.message}</h5>: null }
                        {msg.messageGreen ? <h5 className="loginSucessLabel"><FontAwesomeIcon icon={faThumbsUp}/> {msg.messageGreen}</h5> : null }
                    </div>
                </form>
                
            </div>
        </div>

    
      

    </div>

  )
}

export default Profil;