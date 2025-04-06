import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUser } from './context/UserContext';
import ProtectedRoute from "./pages/components/ProtectedRoute"

import Index from "./pages/notLogged/Index";
import Home from "./pages/notLogged/Home";
import Register from "./pages/notLogged/Regpage";

import Stats from "./pages/logged/Stats";
import Levels from "./pages/logged/Levels";
import Level from "./pages/logged/Level";
import Profile from "./pages/logged/Profile";

import Admin from "./pages/admin/Admin";
import AdminLevelUpdate from "./pages/admin/AdminLevelUpdate";
import AdminLevelID from "./pages/admin/AdminLevelID";

import AdminUserUpdate from "./pages/admin/AdminUserUpdate";
import AdminUserID from "./pages/admin/AdminUserID";

import AdminLevelAdd from "./pages/admin/AdminLevelAdd";
import AdminUserAdd from "./pages/admin/AdminUserAdd";

import Loading from "./pages/components/Loading";
import NotFound from "./pages/components/NotFound";

import "./App.css";

function App() {
    const { loading } = useUser();

    if (loading) {
        return <Loading />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />

                <Route path="/stats" element={<ProtectedRoute><Stats /></ProtectedRoute>} />
                <Route path="/levels" element={<ProtectedRoute><Levels /></ProtectedRoute>} />
                <Route path="/level/:id" element={<ProtectedRoute><Level /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
                <Route path="/admin/level/update" element={<ProtectedRoute adminOnly><AdminLevelUpdate /></ProtectedRoute>} />
                <Route path="/admin/level/update/:id" element={<ProtectedRoute adminOnly><AdminLevelID /></ProtectedRoute>} />
                <Route path="/admin/user/update" element={<ProtectedRoute adminOnly><AdminUserUpdate /></ProtectedRoute>} />
                <Route path="/admin/user/update/:id" element={<ProtectedRoute adminOnly><AdminUserID /></ProtectedRoute>} />
                <Route path="/admin/level/add" element={<ProtectedRoute adminOnly><AdminLevelAdd /></ProtectedRoute>} />
                <Route path="/admin/user/add" element={<ProtectedRoute adminOnly><AdminUserAdd /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
