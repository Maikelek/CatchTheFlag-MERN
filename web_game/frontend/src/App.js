import {BrowserRouter,Routes,Route,} from "react-router-dom";

import Index from "./pages/player/Index"
import Domov from "./pages/player/Domov";
import Levely from "./pages/player/Levely";
import Register from "./pages/player/Regpage";
import Level from "./pages/player/Level";


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
          <Route path="/" element={<Index/>}/>
          <Route path="/domov" element={<Domov/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/levely" element={<Levely/>}/>
          <Route path="/level/:id" element={<Level/>}/>

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
