import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import PageNotFound from './components/PageNotFound';
import { Toaster } from 'react-hot-toast';

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const navigate = useNavigate();

  // Update token state if it's changed
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    setToken(storedToken);
  }, []); // Run once on component mount

  return (
    <div>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Login setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/logout" element={<Logout setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
