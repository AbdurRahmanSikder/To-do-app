import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
function Home() {
    const navigateTo = useNavigate();
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [newTodo, setNewTodo] = useState("");
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:3000/todo/fetch", {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                console.log(response.data.todo);
                setTodos(response.data.todo);
                setError(null);
            }
            catch (error) {
                console.log(error);
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        }
        fetchTodos();
    }, [])

    const createTodo = async () => {
        if (!newTodo)
            return;
        try {
            const response = await axios.post("http://localhost:3000/todo/create", {
                text: newTodo,
                completed: false
            }, {
                withCredentials: true
            })
            console.log(response.data);
            setTodos([...todos, response.data.newTodo]);
            setNewTodo("");
        }
        catch (error) {
            console.log(error);
            setError("Failed to create TODO");
        }
    };

    const createStatus = async (id) => {
        const todo = todos.find((t) => t._id === id)
        try {
            const response = await axios.put(`http://localhost:3000/todo/update/${id}`, {
                ...todo,
                complete: !todo.complete
            }, {
                withCredentials: true
            });
            setTodos(todos.map((t) => t._id === id ? response.data.todo : t));
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
            setError("Failed To Create Status");
        }
    }

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/todo/delete/${id}`, {
                withCredentials: true
            });

            setTodos(todos.filter((t) => (t._id !== id)));
        }
        catch (error) {
            console.log(error);
            setError("Failed To deleteTodo");
        }
    }

    const logout = async () => {

        try {
            const response = await axios.get("http://localhost:3000/user/logout",{
                withCredentials: true
            });
            toast.success(response.data.message);
            navigateTo("/login");
            localStorage.removeItem("jwt");
        }
        catch (error) {
            console.log(error);
            toast.error(error.response.data.error);
        }
    }
    const remainingTodo = todos.filter((todo) => !todo.complete).length
    return (
        <div className='my-10 bg-gray-300 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6'>
            <h1 className='text-2xl text-center font-semibold mb-4'>Todo App</h1>
            <div className='flex mb-4'>
                <input
                    value={newTodo}
                    onKeyPress={(e) => e.key === 'Enter' && createTodo()}
                    onChange={(e) => setNewTodo(e.target.value)}
                    type='text'
                    placeholder='Add todo'
                    className='flex-grow p-2 border focus:outline-none rounded-l-md'
                />
                <button onClick={() => createTodo()} className='bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-900 duration-300'>ADD</button>
            </div>
            {
                loading ? <div className='text-gray-600 font-bold text-center my-2'>Loading...</div> : error ? <div className='text-center text-red-600 font-semibold my-2'>{error}</div> : <ul className='space-y-2'>
                    {todos.map((t, index) =>
                        <li key={t._id} className='flex justify-between items-center rounded-md p-3'>
                            <div >
                                <input type='checkbox' className='mr-2' checked={t.complete} onChange={() => createStatus(t._id)} />
                                <span className={`${t.complete ? "line-through text-gray-500 font-semibold" : ""}`}> {t.text} </span>
                            </div>
                            <button onClick={() => deleteTodo(t._id)} className='text-red-500 hover:text-red-800 duration - 300'>Delete</button>
                        </li>
                    )}
                </ul>
            }

            <p className='mt-4 text-center text-sm text-gray-700'>{remainingTodo} todo remaining</p>
            <button onClick={() => { logout() }} className='mx-auto bg-red-600 px-4 text-white hover:bg-red-900 duration-300 py-2 rounded-md block mt-6'>Log Out</button>
        </div>
    )
}
export default Home