import { createContext, useState } from "react";
import { useFullScreenHandle } from "react-full-screen";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [toggleFullScreen, setToggleFullScreen] = useState(false);
    const [courseState, setCourseState] = useState({})
    const [quizState, setQuizState] = useState({})

    const fullScreenHandle = useFullScreenHandle();

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            courseState,
            setCourseState,
            quizState,
            setQuizState,
            toggleSidebar,
            setToggleSidebar,
            fullScreenHandle
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;