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
    const [query, setQuery] = useState("");
    const [filterTodos, setFilterTodos] = useState([]);
    const [username, setUserName] = useState("");


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
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/user/isauth');
            console.log(data);
            if (data.success) {
                setUserLogin(true);
                setUserName(data.name);
            }
            else
                console.log(data.error);
        }
        catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        if (query.length > 0) {
            console.log(query);
            const searchTodo = todos.filter(todo => todo.text.toLowerCase().includes(query.toLowerCase()));
            setFilterTodos(searchTodo);
        }
        else {
            setFilterTodos(todos);
        }
    }, [query, todos]);
    useEffect(() => {
        if (userLogin)
            fetchTodo();
        else setTodos([]);
    }, [userLogin]);

    useEffect(() => {
        fetchUser();
    }, []);

    const value = { navigate, username, setUserName, axios, todos, setTodos, userLogin, setUserLogin, query, setQuery , filterTodos};
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}