import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TodosContext = createContext(null);
const TodosContextProvider = (props)=>{
    const url = 'https://maiquoctuan.io.vn'
    const [token,setToken] = useState("")
    const [userId, setUserId] = useState("")








    

    const contextValue = {
        url,
        token,
        userId,
        setToken,
        setUserId
    }
    return(
        <TodosContext.Provider value={contextValue}>
            {props.children}
        </TodosContext.Provider>
    )
}

export default TodosContextProvider;
