import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import PropTypes from 'prop-types';  // Importa PropTypes

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const [userPayload, setUserPayload] = useState(null);
    
    const login = (token) => {
        localStorage.setItem("token", token); 
        const decodedPayload = jwtDecode(token);
        setUserPayload(decodedPayload);
        setIsAuth(true); 
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUserPayload(null);
        setIsAuth(false);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedPayload = jwtDecode(token);
            setUserPayload(decodedPayload);
            setIsAuth(true);
        }
    }, []);

    const values = {
        isAuth,
        userPayload,
        login,
        logout
    }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

// Define las propTypes para AuthProvider
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export {AuthProvider, AuthContext }
