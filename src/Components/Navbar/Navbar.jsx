import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, currentUser } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? "bg-teal-700" : "";
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <motion.header
      className="bg-teal-600 shadow-lg fixed w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Link
              to="/homepage"
              className="text-white text-2xl font-bold tracking-wider hover:text-yellow-300 transition-colors duration-300"
            >
              Wanderly
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 items-center">
            {[
              { path: "/homepage", label: "Home" },
              { path: "/destinations", label: "Destinations" },
              { path: "/trip-planner", label: "Trip Planner" },
            ].map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-white font-medium hover:bg-teal-700 transition-colors duration-300 ${isActive(
                    item.path
                  )}`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-white">{currentUser?.email}</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-4 py-2 rounded-md text-white font-medium bg-teal-700 hover:bg-teal-800 transition-colors duration-300"
              >
                Logout
              </motion.button>
            </motion.div>
          </nav>

          {/* Mobile menu button */}
          <motion.div
            className="md:hidden flex items-center"
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-yellow-300 focus:outline-none"
            >
              <motion.svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </motion.svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {[
                { path: "/homepage", label: "Home" },
                { path: "/destinations", label: "Destinations" },
                { path: "/trip-planner", label: "Trip Planner" },
              ].map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-white font-medium hover:bg-teal-700 transition-colors duration-300 ${isActive(
                      item.path
                    )}`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="px-3 py-2 text-white font-medium"
              >
                {currentUser?.email}
              </motion.div>
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md text-white font-medium bg-teal-700 hover:bg-teal-800 transition-colors duration-300"
              >
                Logout
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
