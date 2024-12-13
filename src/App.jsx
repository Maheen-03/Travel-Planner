import React from "react";
import DestinationsPage from "./pages/DestinationsPage";
import HomePage from "./pages/HomePage";
import TripPlanner from "./pages/TripPlanner";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUpForm from "./pages/SignUpForm";
import LandingPage from "./pages/LandingPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route
              path="/homepage"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/destinations"
              element={
                <ProtectedRoute>
                  <DestinationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trip-planner"
              element={
                <ProtectedRoute>
                  <TripPlanner />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
