import React from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Logout from './components/Logout'
import { data, Route, Routes } from 'react-router-dom'
import PageNotFound from './components/PageNotFound'
import Signup from './components/Signup'
import { Toaster } from 'react-hot-toast';
function App() {
  const token = localStorage.getItem("jwt");
  return (
    <div>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Login /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App