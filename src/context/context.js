import React, { createContext, useReducer, useState } from 'react'

export const AppContext = createContext();

export default AppProvider = ({ children }) => {
    const  [state, dispatch] = useReducer(reducer, initialValues)

    <AppContext.Provider>
        {children}
    </AppContext.Provider>
}