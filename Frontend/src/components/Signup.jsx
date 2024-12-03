import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';



function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigateTo = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/user/register", {
                username,
                email,
                password
            },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            console.log(response.data);
            toast.success(response.data.message);
            localStorage.setItem("jwt",response.data.token);
            setUsername("");
            setEmail("");
            setPassword("");
            navigateTo("/login");
        }
        catch (error) {
            console.log(error);
            if (error.response.data.Error)
                toast.error(error.response.data.Error);
            else
                toast.error(error.response.data.message);
        }
    }



    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-full max-w-md p-8 bg-gray-300 rounded-lg'>
                <h1 className='text-2xl font-semibold text-center mb-5'>Signup</h1>
                <form onSubmit={handleRegister}>
                    <div className='mb-4'>
                        <label className='mb-2 block font-semibold' htmlFor=''>User name</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} className='p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 rounded w-full' type='text' placeholder='Enter your Name' />
                    </div>
                    <div className='mb-4'>
                        <label className='mb-2 block font-semibold' htmlFor=''>Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className='p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 rounded w-full' type='email' placeholder='Enter your Email' />
                    </div>
                    <div className='mb-4'>
                        <label className='mb-2 block font-semibold' htmlFor=''>Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className='p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 rounded w-full' type='password' placeholder='Enter your Password' />
                    </div>
                    <button type='submit' className='mt-8 mb-4 w-full py-3 bg-blue-600 rounded-md block mx-auto text-white font-semibold hover:bg-blue-800 duration-300'>Signup</button>
                    <p className='text-gray-600 text-center'>
                        Already have an account?
                        <Link className='text-blue-800 hover:underline' to="/login"> Login</Link>
                    </p>
                </form>
            </div >
        </div >
    )
}

export default Signup