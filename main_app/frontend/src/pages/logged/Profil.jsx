import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profil = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [points, setPoints] = useState(0);
    const nav = useNavigate(); 



    useEffect( () => {                
        const fetchPoints = async () => {
            try{
                const response = await axios.post("http://localhost:8800/user/profil", {email})
                setPoints(response.data[0].points)
            }catch(error) {
                console.log(error)
            }
        }
        fetchPoints()
    },[email])

    useEffect(() => {
        fetch('http://localhost:8800/auth', {
            method:'GET',
            headers: {
                'Content-Type':'application/json'
            },
            credentials: 'include'
            }).then(res => res.json()) 
            .then(response => {
              if( response.auth === true ) {
                setName(response.user[0].name);
                setEmail(response.user[0].email);
              } else {
                nav("/"); 
              }
            })
           
        },[nav])

  return (

    <div className='container'>

        <Header />

        <div className="profilHolder">
            <form className="profil">
                <h1 className='profilCenter'>PROFIL</h1>

                <div className="nameRow">

                    <div className="inputWithLabelProfil">
                        <label className="labelForInput" >Meno</label>
                        <input 
                            className="inputField "
                            type="text"
                            value={name}  
                            autoComplete="off" 
                            name='name'/>
                    </div>

                    <div className="inputWithLabelProfil">
                        <label className="labelForInput" >Email</label>
                        <input 
                            className="inputField "
                            type="text"
                            value={email}  
                            autoComplete="off" 
                            name='name'/>
                    </div>

                    </div>

                    <div className="nameRow">

                    <div className="inputWithLabelProfil">
                        <label className="labelForInput" >Heslo</label>
                        <input 
                            className="inputField "
                            type="text"  
                            autoComplete="off" 
                            name='name'/>
                    </div>

                    <div className="inputWithLabelProfil">
                        <label className="labelForInput" >Heslo</label>
                        <input 
                            className="inputField "
                            type="text"  
                            autoComplete="off" 
                            name='name'/>
                </div>
        
                </div>

                <h1 className='profilCenter'>Počet bodov: {points}</h1>

                <button className='profilButton'>Aktualizuj</button>

            </form>
        </div>

    
      

    </div>

  )
}

export default Profil;