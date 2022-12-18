import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";


const useAuth = () => {

    axios.get("http://localhost:8800/jwtAuth", {
        headers: {
            "authorization": localStorage.getItem("token")
        }
    }).then((response) => {
        if (response.data.auth === true) {
            localStorage.setItem("auth", response.data.auth) 
        } else {
            localStorage.setItem("auth", false)
        }
    })
    
    const response = localStorage.getItem("auth");
    return response;

}
    

const ProtectedRoutes = () => {
    const isAuth = true
    if ( isAuth === true) {
        return <Outlet/>
    } else {
        return <Navigate to = "/"/>
    }
}

export default ProtectedRoutes;