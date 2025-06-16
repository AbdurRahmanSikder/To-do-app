import React from 'react'
import logo_img from '../assets/logo.svg'
import search_icon from '../assets/search_icon.svg'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Navbar = () => {
    const { axios,setTodos, setUserLogin, userLogin } = useAppContext();
    const logout = async () => {
        try {
            const { data } = await axios.get('/user/logout');
            if (data.success) {
                toast.success(data.message);
                setUserLogin(false);
                setTodos([]);
            }
            else
                toast.error(data.message);
        }
        catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }
    return (
        <nav className="flex items-center justify-between gap-2 px-2 md:px-32 lg:px-48 xl:px-64 border-b border-gray-300 bg-white relative transition-all">
            <div className='flex md:flex-1 items-center'>
                <a href="#">
                    <img className="min-w-24 md:w-36 object-contain" src={logo_img} alt="dummyLogoColored" />
                </a>
                <div className="flex items-center text-sm gap-2 w-full max-w-md border border-gray-300 px-3 rounded-sm">
                    <input className="w-full py-1 md:py-1.5 bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search" />
                    <img src={search_icon} alt="" />
                </div>

            </div>

            <div>
                {
                    userLogin ?
                        <div className='flex items-center gap-4 '>
                            <p className='text-xl font-semibold'>Hi User!</p>
                            <button onClick={logout} className="cursor-pointer px-8 py-2 bg-[#8bc020] hover:bg-[#93c52e] transition text-white rounded-full">
                                Logout
                            </button>

                        </div> : <button className="cursor-pointer px-8 py-2 bg-[#8bc020] hover:bg-[#93c52e] transition text-white rounded-full">
                            Login
                        </button>
                }
            </div>


        </nav>
    )
}

export default Navbar