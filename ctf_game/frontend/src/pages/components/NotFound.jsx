import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const NotFound = () => {

  return (

    <div className='home'>
      <Header />
      <h1>404</h1>
      <h2 style={{textAlign: "center", marginTop: "10px"}}>This page was not found on the server😢</h2>
      <h3 style={{marginTop: "10px"}}>Go back 👉🏻<Link 
                      to="/" 
                      style={{color: "white", textDecoration: "none"}}
                      >
                    HERE
                  </Link>
        👈🏻</h3>
    </div>

  )
}

export default NotFound;
