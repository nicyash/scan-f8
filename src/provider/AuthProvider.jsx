import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [Authorized, setAuthorized] = useState(false);

    const checkAuthStatus = () => {
        const accessToken = localStorage.getItem('accessToken');
        const tokenExpire = localStorage.getItem('tokenExpire');
        const now = new Date();
        if (!accessToken || !tokenExpire || new Date(tokenExpire) <= now) {
            console.log("Token expired or not found.");
            setAuthorized(false);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('tokenExpire');
        } else {
            setAuthorized(true);
        }
    };

    return (
        <AuthContext.Provider value={{ Authorized, setAuthorized, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export const Auth_ = () => useContext(AuthContext);