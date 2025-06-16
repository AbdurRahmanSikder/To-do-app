import { Children, createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

axios.defaults.withCredentials=true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState(false);
    const value = {navigate,axios,userLogin, setUserLogin};

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}