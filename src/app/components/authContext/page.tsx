"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{
    isLoggedIn: boolean,
    setIsLoggedIn: (val: boolean) => void
}>({
    isLoggedIn: false,
    setIsLoggedIn: () => {}
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    useEffect(() => {
        const checkAuth = async () => {
            try {
                axios.get("/api/users/me");
                setIsLoggedIn(true)
            } catch (error) {
                setIsLoggedIn(false)
            }
        }
        checkAuth();
    }, [])

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);