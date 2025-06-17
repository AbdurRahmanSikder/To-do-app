import React, { useState } from 'react';
import logo_img from '../assets/logo.svg';
import search_icon from '../assets/search_icon.svg';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const { axios, setTodos, setUserLogin, username, userLogin, setQuery } = useAppContext();
    const [menuOpen, setMenuOpen] = useState(false);

    const logout = async () => {
        try {
            const { data } = await axios.get('/user/logout');
            if (data.success) {
                toast.success(data.message);
                setUserLogin(false);
                setTodos([]);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    return (
        <nav className="bg-white border-b border-gray-200 px-4 md:px-12 py-3 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <img src={logo_img} alt="Logo" className="w-24 md:w-32 object-contain" />
                </div>

                {/* Search Bar - always visible */}
                <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 w-full max-w-md mx-auto flex-1">
                    <input
                        onChange={(e) => setQuery(e.target.value)}
                        type="text"
                        placeholder="Search"
                        className="w-full bg-transparent text-sm placeholder-gray-500 outline-none"
                    />
                    <img src={search_icon} alt="Search" className="w-4 h-4" />
                </div>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    {userLogin ? (
                        <>
                            <p className="text-sm font-medium">Hi {username}!</p>
                            <button
                                onClick={logout}
                                className="bg-[#8bc020] hover:bg-[#93c52e] text-white px-5 py-2 rounded-full text-sm"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <NavLink to="/login">
                            <button className="bg-[#8bc020] hover:bg-[#93c52e] text-white px-5 py-2 rounded-full text-sm">
                                Login
                            </button>
                        </NavLink>
                    )}
                </div>

                {/* Mobile menu toggle */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}
                            viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile dropdown auth menu */}
            {menuOpen && (
                <div className="md:hidden mt-2 space-y-2">
                    <div className="flex flex-col items-start gap-2">
                        {userLogin ? (
                            <>
                                <p className="text-sm font-medium">Hi {username}!</p>
                                <button
                                    onClick={logout}
                                    className="bg-[#8bc020] hover:bg-[#93c52e] text-white px-4 py-2 rounded-full text-sm w-full text-left"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <NavLink to="/login" className="w-full">
                                <button className="bg-[#8bc020] hover:bg-[#93c52e] text-white px-4 py-2 rounded-full text-sm w-full text-left">
                                    Login
                                </button>
                            </NavLink>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
