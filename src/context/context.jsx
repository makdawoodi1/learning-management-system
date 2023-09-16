import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [courseState, setCourseState] = useState({
        courseFolderKey: null,
        courseTitle: null,
        courseDescription: null,
        price: 0,
        introductoryVideo: null,
        thumbnail: null,
        lessonAttachments: [],
        lessonFiles: [],
        archived: false,
        published: false,
        modules: [],
        lessons: []
    })

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            courseState,
            setCourseState }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;