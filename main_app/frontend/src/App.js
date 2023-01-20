import {BrowserRouter,Routes,Route,} from "react-router-dom";

import Index from "./pages/notLogged/Index"
import Domov from "./pages/notLogged/Domov";
import Register from "./pages/notLogged/Regpage";
import Stats from "./pages/notLogged/Stats";



import Levely from "./pages/logged/Levely";
import Level from "./pages/logged/Level";
import Profil from "./pages/logged/Profil";



import Admin from "./pages/admin/Admin";

import AdminLevelUpdate from "./pages/admin/AdminLevelUpdate";
import AdminLevelID from "./pages/admin/AdminLevelID";

import AdminUserUpdate from "./pages/admin/AdminUserUpdate";
import AdminUserID from "./pages/admin/AdminUserID";

import AdminLevelAdd from "./pages/admin/AdminLevelAdd";
import AdminUserAdd from "./pages/admin/AdminUserAdd";

import "./App.css";



function App() {
  return ( 
    <div className="App">
      <BrowserRouter>  
        <Routes>
          <Route path="*" element={<Domov/>}/>

          <Route path="/" element={<Index/>}/>
          <Route path="/domov" element={<Domov/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/stats" element={<Stats/>}/>

        
          <Route path="/levely" element={<Levely/>}/>
          <Route path="/level/:id" element={<Level/>}/>
          <Route path="/profil" element={<Profil/>}/>

      
          <Route path="/admin" element={<Admin/>}/>

          <Route path="/admin/level/update" element={<AdminLevelUpdate/>}/>
          <Route path="/admin/level/update/:id" element={<AdminLevelID/>}/>

          <Route path="/admin/user/update" element={<AdminUserUpdate/>}/>
          <Route path="/admin/user/update/:id" element={<AdminUserID/>}/>

          <Route path="/admin/level/add" element={<AdminLevelAdd/>}/>
          <Route path="/admin/user/add" element={<AdminUserAdd/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
