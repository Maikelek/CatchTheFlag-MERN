import React from 'react';
import Header from '../components/Header';

const Domov = () => {
  return (

    <div className='container'>

      <Header />
      
      <div className='domov'>

          <div className='text'>
            <div>
              <h1 className='typing'>Ročníkový projekt</h1>
            </div>
            <p>
                Ročníkový projekt v podobe webovej stránky so zameraním na prácu s webovými technológiami, sociálnymi sieťami, šifrovaním, forénznou a malwareovou analýzou. Jeho úlohou je zvýšiť povedomie o 
                týchto technológiach a ich nebezpečenstvách. Súťaž je vhodná prevažne pre študentov stredných škôl a vyššie.
                <br></br><br></br>
                
                Jedná sa o /catch the flag\ hru. Pre prechod do ďalšieho levlu je potrebné na stránke za pomoci využitia technológii spomenutých vyššie nájsť heslo 
                v tvare <strong>/lx-heslo\</strong>. Prípadne inak špecifikované v konkrétnom leveli.
                <br></br><br></br>
                Projekt je inšpirovaný CTF súťažiami ako TryhackMe, HackTheBox, CyberGame, HackQuest.

            </p>
         </div>
      </div>

    </div>

  )
}

export default Domov;