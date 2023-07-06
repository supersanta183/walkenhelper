'use client'

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react"

const GlobalContext = createContext({userId: '', setUserId: () => '', user: {}, setUser: () => []})

export const GlobalContextProvider = ({children}) => {
    const [userId, setUserId] = useState('')
    const [user, setUser] = useState(null)

    return (
        <GlobalContext.Provider value={{ userId, setUserId, user, setUser}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)