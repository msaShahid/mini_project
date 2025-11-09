import { ReactNode, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { User, AuthState } from "../types/User";
import { usersApi } from "../api/usersApi";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    const [loading, setLoading] = useState(false);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const userData = await usersApi.login({ email, password });
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData)); 
            localStorage.setItem("token", userData.token); 
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);   
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    useEffect(() => {
        if (user) localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    const contextValue: AuthState = { user, loading, login, logout };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
