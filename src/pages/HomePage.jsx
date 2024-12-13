import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/Travel-Planner/Images/m1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <h1 className="text-5xl text-white font-bold mb-4">Wanderly</h1>
          <p className="text-lg md:text-2xl text-white mb-8 text-center max-w-2xl px-4">
            Discover the world, experience the magic, and uncover new places to
            visit.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/destinations")}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Explore Destinations
            </button>
            <button
              onClick={() => navigate("/trip-planner")}
              className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-6 rounded-lg border-2 border-white transition-colors duration-300"
            >
              Plan Your Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
