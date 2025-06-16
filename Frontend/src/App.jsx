import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';
import Login from './pages/Login';
import Navbar from './components/Navbar';
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const {userLogin} = useAppContext();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <div>
      <Toaster />
      { userLogin? null : <Login /> }
      <Navbar />
      <Routes>
        <Route path="/" element={userLogin? <Home /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
