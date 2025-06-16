import { createContext, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState(false);
    const [todos, setTodos] = useState([]);
    const fetchTodo = async () => {
        try {
            const { data } = await axios.get('/todo/fetch');
            if (data.success) {
                setTodos(data.todo);
            }
            else setTodos([]);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (userLogin)
            fetchTodo();
        else setTodos([]);
    }, [userLogin]);

    

    const value = { navigate, axios, todos, setTodos, userLogin, setUserLogin };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}