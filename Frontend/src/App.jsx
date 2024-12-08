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

  // Sync token state with localStorage whenever it changes
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    setToken(storedToken);
  }, []); 

  // Update token in localStorage and state after login
  const handleLoginSuccess = (newToken) => {
    localStorage.setItem("jwt", newToken);
    setToken(newToken); // Trigger a re-render
    navigate("/"); // Redirect to Home after successful login
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Login handleLoginSuccess={handleLoginSuccess} />} />
        <Route path="/login" element={<Login handleLoginSuccess={handleLoginSuccess} />} />
        <Route path="/logout" element={<Logout setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
