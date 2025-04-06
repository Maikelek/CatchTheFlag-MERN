import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import config from "../config/config";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${config.apiUrl}/auth`, { withCredentials: true });
                if (response.data.auth) {
                    setUser(response.data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.log("Error loading user:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 700);
            }
        };
    
        fetchUser();
    }, []);
    

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
