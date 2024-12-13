import React from 'react';
//import Navbar from './Components/Navbar/Navbar';
import DestinationsPage from './pages/DestinationsPage';
import HomePage from './pages/HomePage';
import TripPlanner from './pages/TripPlanner';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUpForm from './SignUpForm';
//import Dashboard from './pages/Dashboard'; // Make sure Dashboard exists
import './App.css';

const App = () => {
 
  return (
    <div>
      <BrowserRouter>
         
        
        <Routes>
          <Route path="/" element={<SignUpForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
