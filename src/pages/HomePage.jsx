import React from 'react';

const HomePage = () => {
  return (
    
    <div className='relative h-screen bg-cover bg-center' style={{backgroundImage : "url('/Images/m1.jpg')"}}>
      <div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center'>
        <h1 className='text-5xl text-white font-bold'>Welcome to Wanderly</h1>
        <p className='text-lg md:text-2xl text-white mb-8'>Discover the world, experience the magic, and uncover new places to visit.</p>
        <button className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded">Discover Now</button>
      </div>
    </div>
  );
};

export default HomePage;