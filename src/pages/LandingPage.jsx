import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-teal-800">
      <div className="container mx-auto px-4 h-screen flex flex-col items-center justify-center">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">Wanderly</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Your personal travel companion. Plan trips, discover destinations, and create unforgettable memories.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <button
            onClick={() => navigate('/login')}
            className="w-full py-4 px-8 bg-white text-teal-800 rounded-lg font-semibold text-lg hover:bg-teal-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="w-full py-4 px-8 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Sign Up
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-white">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Plan Your Trips</h3>
            <p className="text-white/80">Create detailed itineraries with our drag-and-drop planner</p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Discover Places</h3>
            <p className="text-white/80">Explore curated destinations from around the world</p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Travel Smart</h3>
            <p className="text-white/80">Get insights and tips for your next adventure</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 