import React from 'react';

const Navbar = () => {
  return (
    <div>
      <header className="bg-teal-500 p-4 flex flex-row justify-between items-center shadow-lg">
        <div className="flex items-center">
          <h3 className="text-white text-3xl font-bold transition-transform transform hover:scale-105">Wanderly</h3>
        </div>
        <nav className="space-x-8">
          <a href="#" className="text-white text-lg font-medium hover:text-yellow-300 m-auto p-6 rounded-2xl py-3 hover:bg-teal-700 transition-colors duration-300">Home</a>
          <a href="#" className="text-white text-lg font-medium hover:text-yellow-300 m-auto p-6 rounded-2xl py-3 hover:bg-teal-700 transition-colors duration-300">About</a>
          <a href="#" className="text-white text-lg font-medium hover:text-yellow-300 m-auto p-6 rounded-2xl py-3 hover:bg-teal-700 transition-colors duration-300">Services</a>
          <a href="#" className="text-white text-lg font-medium hover:text-yellow-300 m-auto p-6 rounded-2xl py-3 hover:bg-teal-700 transition-colors duration-300">Contact</a>
          <a href="#" className="text-white text-lg font-medium hover:text-yellow-300 m-auto p-6 rounded-2xl py-3 hover:bg-teal-700 transition-colors duration-300">Help</a>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
