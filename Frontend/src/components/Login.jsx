import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login({ setToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigateTo = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Make API call to login
            const response = await axios.post(
                "https://todo-app-6kxd.onrender.com/user/login", 
                { email, password },
                { 
                    withCredentials: true, 
                    headers: { "Content-Type": "application/json" }
                }
            );

            // On success, store the JWT in localStorage and handle navigation
            console.log(response.data);
            toast.success(response.data.message);
            
            // Store the JWT token in localStorage for persistent authentication
            localStorage.setItem("jwt", response.data.token);

            // Update state in App.js to reflect authentication
            setToken(response.data.token);

            // Redirect user to the home page after successful login
            navigateTo("/");

            // Clear form fields after submission
            setEmail("");
            setPassword("");
        } catch (error) {
            // Handle errors
            console.log(error);
            if (error.response?.data?.Error) {
                toast.error(error.response.data.Error);
            } else {
                toast.error(error.response?.data?.message || "Login failed.");
            }
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-gray-300 rounded-lg">
                <h1 className="text-2xl font-semibold text-center mb-5">Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="mb-2 block font-semibold" htmlFor="">Email</label>
                        <input 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 rounded w-full" 
                            type="email" 
                            placeholder="Enter your Email" 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block font-semibold" htmlFor="">Password</label>
                        <input 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 rounded w-full" 
                            type="password" 
                            placeholder="Enter your Password" 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="mt-8 mb-4 w-full py-3 bg-blue-600 rounded-md block mx-auto text-white font-semibold hover:bg-blue-800 duration-300"
                    >
                        Login
                    </button>
                    <p className="text-gray-600 text-center">
                        Not have an account? 
                        <Link className="text-blue-800 hover:underline" to="/signup"> Signup</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
