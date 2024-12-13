import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

const destinations = [
  {
    id: 1,
    name: "Paris",
    region: "Europe",
    type: "Cultural",
    budget: 1500,
    image: "/paris.jpg",
    rating: 4.5,
    description:
      "The City of Light beckons with its magnificent art, architecture, culture, and cuisine.",
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
  },
  {
    id: 2,
    name: "Tokyo",
    region: "Asia",
    type: "Adventure",
    budget: 2000,
    image: "/tokyo.jpg",
    rating: 4.7,
    description:
      "A dazzling blend of modern technology and traditional culture.",
    highlights: ["Tokyo Tower", "Shibuya Crossing", "Senso-ji Temple"],
  },
  {
    id: 3,
    name: "New York",
    region: "Americas",
    type: "Cultural",
    budget: 1800,
    image: "/newyork.jpg",
    rating: 4.6,
    description:
      "The city that never sleeps offers endless entertainment and cultural experiences.",
    highlights: ["Times Square", "Central Park", "Empire State Building"],
  },
];

const DestinationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const filteredDestinations = destinations.filter((destination) => {
    return (
      (selectedRegion === "" || destination.region === selectedRegion) &&
      (selectedType === "" || destination.type === selectedType) &&
      (selectedBudget === "" ||
        destination.budget <= parseInt(selectedBudget)) &&
      (searchQuery === "" ||
        destination.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const DetailModal = ({ destination, onClose }) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-64 object-cover rounded-t-xl"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 bg-white p-2 rounded-full"
              onClick={onClose}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
            <div className="absolute top-4 left-4 bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-sm font-bold flex items-center">
              <span className="mr-1">★</span>
              {destination.rating}
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {destination.name}
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                  {destination.region}
                </span>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                  {destination.type}
                </span>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                  ${destination.budget}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                About
              </h3>
              <p className="text-gray-600">{destination.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <svg
                      className="w-5 h-5 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6 w-full">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/trip-planner"
                  onClick={() => {
                    onClose();
                  }}
                  className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Plan Trip to {destination.name}</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <motion.div
        className="container mx-auto p-4 pt-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <motion.h1
            className="text-4xl font-bold text-teal-800 mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Explore Destinations
          </motion.h1>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Discover amazing places around the world
          </motion.p>
        </div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {["Region", "Type", "Budget"].map((filter, index) => (
              <motion.select
                key={filter}
                className="w-full py-3 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                onChange={(e) => {
                  if (filter === "Region") setSelectedRegion(e.target.value);
                  if (filter === "Type") setSelectedType(e.target.value);
                  if (filter === "Budget") setSelectedBudget(e.target.value);
                }}
              >
                <option value="">{`All ${filter}s`}</option>
                {/* Add options based on filter type */}
              </motion.select>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredDestinations.map((destination) => (
            <motion.div
              key={destination.id}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
              onHoverStart={() => setHoveredCard(destination.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <div className="relative h-56">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0"
                  animate={{ opacity: hoveredCard === destination.id ? 1 : 0 }}
                >
                  <button
                    className="px-6 py-2 bg-white text-teal-800 rounded-full font-semibold transform hover:scale-105 transition-transform"
                    onClick={() => setSelectedDestination(destination)}
                  >
                    View Details
                  </button>
                </motion.div>
                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                  <span className="mr-1">★</span>
                  {destination.rating}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {destination.name}
                </h2>
                <p className="text-gray-600 mb-4">{destination.description}</p>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                      {destination.region}
                    </span>
                    <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                      {destination.type}
                    </span>
                    <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                      ${destination.budget}
                    </span>
                  </div>

                  <div className="border-t pt-3">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">
                      Highlights:
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {destination.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedDestination && (
          <DetailModal
            destination={selectedDestination}
            onClose={() => setSelectedDestination(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DestinationsPage;
