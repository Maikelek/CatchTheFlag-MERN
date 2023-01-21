import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profil = () => {

    const [email, setEmail] = useState("");
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
                const authResponse = await axios.get('http://localhost:8800/auth', {
                    headers: {
                        'Content-Type':'application/json'
                    },
                    withCredentials: true
                });
                if( authResponse.data.auth ) {
                    setUser(authResponse.data.user);
                    setEmail(authResponse.data.user.email);
                    const profileResponse = await axios.post("http://localhost:8800/profil", {email});
                    if(profileResponse.data && profileResponse.data.points) {
                        setPoints(profileResponse.data.points);
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

    console.log(user)

  return (

    <div className='container'>

        <Header />

        <div className="holder">
            <div className="profil">
                <h1 className='profilCenter'>PROFIL</h1>   
                
                <form>    
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
                            <label className="labelForInput" >Heslo</label>
                            <input 
                                className="inputFieldProfil"
                                type="password"
                                value={user.pass}
                                autoComplete="off" 
                                name='pass'
                                onChange={(e) => {
                                    setUser({...user, pass: e.target.value})
                                }}/>
                        </div>

                        <div className="inputWithLabelProfil">
                            <label className="labelForInput" >Heslo</label>
                            <input 
                                className="inputFieldProfil"
                                type="password"
                                value={user.passRep}  
                                autoComplete="off" 
                                name='passRep'
                                onChange={(e) => {
                                    setUser({...user, passRep: e.target.value})
                                }}/>
                        </div>
                    </div>
                </form>
                
                <h2 className='profilCenter'>Počet bodov: <i className='points'>{points}</i></h2>
                <button className='profilButton'>Aktualizuj</button>
            </div>
        </div>

    
      

    </div>

  )
}

export default Profil;