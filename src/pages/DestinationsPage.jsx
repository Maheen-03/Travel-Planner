import React, { useState } from 'react';

const destinations = [
  { id: 1, name: 'Paris', region: 'Europe', type: 'Cultural', budget: 1500, image: '/paris.jpg', rating: 4.5 },
  { id: 2, name: 'Tokyo', region: 'Asia', type: 'Adventure', budget: 2000, image: '/tokyo.jpg', rating: 4.7 },
  { id: 3, name: 'New York', region: 'Americas', type: 'Cultural', budget: 1800, image: '/newyork.jpg', rating: 4.6 },
];

const DestinationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  const filteredDestinations = destinations.filter(destination => {
    return (
      (selectedRegion === '' || destination.region === selectedRegion) &&
      (selectedType === '' || destination.type === selectedType) &&
      (selectedBudget === '' || destination.budget <= selectedBudget) &&
      (searchQuery === '' || destination.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Browse Destinations</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search destinations..."
            className="border rounded p-2 w-full mb-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex space-x-2 mb-2">
            <select
              className="border rounded p-2 flex-1"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">All Regions</option>
              <option value="Europe">Europe</option>
              <option value="Asia">Asia</option>
              <option value="Americas">Americas</option>
            </select>
            <select
              className="border rounded p-2 flex-1"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Adventure">Adventure</option>
              <option value="Relaxation">Relaxation</option>
              <option value="Cultural">Cultural</option>
              <option value="Family">Family</option>
            </select>
            <select
              className="border rounded p-2 flex-1"
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
            >
              <option value="">All Budgets</option>
              <option value="500">&lt; $500</option>
              <option value="1000">$500 - $1000</option>
              <option value="1500">$1000 - $1500</option>
              <option value="2000">&gt; $1500</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDestinations.map(destination => (
            <div key={destination.id} className="border rounded-lg shadow p-4 bg-gray-200">
              <div className="mb-2 border-b pb-2">
                <img src={destination.image} alt={destination.name} className="w-full h-48 object-cover rounded" />
              </div>
              <h2 className="text-xl font-bold">{destination.name}</h2>
              <p className="text-gray-600">{destination.region}</p>
              <p className="text-gray-600">{destination.type}</p>
              <p className="text-gray-800 font-semibold">${destination.budget}</p>
              <p className="text-yellow-500 font-semibold">Rating: {destination.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationsPage;
