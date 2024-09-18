import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Start from './pages/Start/Start';
import Weather from './pages/Weather/Weather';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth } from './config/firebase';

const App = () => {

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<Login />} />
        <Route path='/weather' element={<Weather />} />
      </Routes>
    </div>
  );
};

export default App;
