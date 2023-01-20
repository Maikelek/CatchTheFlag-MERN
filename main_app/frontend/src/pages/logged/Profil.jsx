import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profil = () => {

    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [points, setPoints] = useState(0);
    const nav = useNavigate(); 

    useEffect(() => {
        axios.get('http://localhost:8800/auth', {
            headers: {
                'Content-Type':'application/json'
            },
            withCredentials: true
            })
            .then(response => {
              if( response.data.auth ) {
                setUser(response.data.user[0]);
                setEmail(response.data.user[0].email);
              } else {
                nav("/"); 
              }
            }).catch(error => console.log(error))
            if(email) {
                const fetchPoints = async () => {
                    try{
                        const response = await axios.post("http://localhost:8800/profil", {email})
                        setPoints(response.data[0].points)
                    }catch(error) {
                        console.log(error)
                    }
                }
                fetchPoints()
            }
    }, [nav, email])

    const handleChange = (e) => {
        setUser(prev => ({...prev, [e.target.name]: e.target.value})); 
    };

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
                                onChange={handleChange}  
                                autoComplete="off" 
                                name='name'/>
                        </div>

                        <div className="inputWithLabelProfil">
                            <label className="labelForInput" >Email</label>
                            <input 
                                className="inputFieldProfil"
                                type="text"
                                value={user.email}
                                onChange={handleChange}  
                                autoComplete="off" 
                                name='email'/>
                        </div>

                        </div>

                        <div className="nameRow">

                        <div className="inputWithLabelProfil">
                            <label className="labelForInput" >Heslo</label>
                            <input 
                                className="inputFieldProfil"
                                type="password"
                                value=""
                                onChange={handleChange}    
                                autoComplete="off" 
                                name='pass'/>
                        </div>

                        <div className="inputWithLabelProfil">
                            <label className="labelForInput" >Heslo</label>
                            <input 
                                className="inputFieldProfil"
                                type="password"
                                value=""
                                onChange={handleChange}    
                                autoComplete="off" 
                                name='passRep'/>
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