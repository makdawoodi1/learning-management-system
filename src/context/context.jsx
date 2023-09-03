import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [shortToken, setShortToken] = useState({});
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, shortToken, setShortToken, toggleMenu, setToggleMenu }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;