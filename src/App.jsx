import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import DestinationsPage from './pages/DestinationsPage';
import HomePage from './pages/HomePage';
import TripPlanner from './pages/TripPlanner';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUpForm from './SignUpForm';
//import Dashboard from './pages/Dashboard'; // Make sure Dashboard exists
import './App.css';

const App = () => {
  const navbarContent = [
    { href: '#', label: 'Home' },
    { href: '#', label: 'About' },
    { href: '#', label: 'Services' },
    { href: '#', label: 'Contact' },
    { href: '#', label: 'Help' },
  ];

  return (
    <div>
      <BrowserRouter>
        <Navbar title="Wanderly" content={navbarContent} /> {/* Display navbar on all pages */}
        
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
