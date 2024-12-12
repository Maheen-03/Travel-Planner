import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import DestinationsPage from './pages/DestinationsPage';
import HomePage from './pages/HomePage';
import TripPlanner from './pages/TripPlanner';

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
      <Navbar title="Wanderly" content={navbarContent} />
      <HomePage />
      <DestinationsPage />
      <TripPlanner />
    </div>
  );
};

export default App;
