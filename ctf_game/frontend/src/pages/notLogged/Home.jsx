import React from 'react';
import Header from '../components/Header';

const Home = () => {
  return (

    <div className='container'>

      <Header />
      
      <div className='home'>

          <div className='text'>
            <div>
              <h1 className='typing'>CTF GAME</h1>
            </div>
            <p>
            This is a website project focused on working with web technologies, social networks, encryption, forensic and malware analysis. Its task is to increase awareness of these technologies and their dangers. The competition is suitable mainly for high school and higher education students.
            <br></br><br></br>
            It is a /catch the flag\ game. To move on to the next level, it is necessary to find a password in the form <strong>/lx-password\</strong> on the website using the technologies mentioned above. Alternatively, it may be specified differently in a specific level.
            <br></br><br></br>
            The project is inspired by CTF competitions such as TryhackMe, HackTheBox, CyberGame, HackQuest.

            </p>
         </div>
      </div>

    </div>

  )
}

export default Home;
