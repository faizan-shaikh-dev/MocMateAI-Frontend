import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = localStorage.getItem("token");

            if (token) {
                try {
                    const res = await api.get("/user/profile");
                    setUser(res.data);
                } catch (error) {
                    console.error("Session expired:", error);
                    localStorage.removeItem("token");
                    setUser(null);

                }
            }

            setLoading(false);
        };

        checkLoginStatus();
    }, [])

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        return res.data;
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}