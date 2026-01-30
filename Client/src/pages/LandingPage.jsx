import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <header className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-xl font-bold">AI Recruitment</h1>
          <nav className="space-x-4">
            <Link to="/login" className="hover:text-blue-600">Login</Link>
            <Link to="/register" className="hover:text-blue-600">Register</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center px-6">
        <h2 className="text-4xl font-bold mb-4">Intelligent AI Recruitment System</h2>
        <p className="text-gray-700 mb-6">
          Automate hiring with AI agents, unbiased screening, dynamic interviews, and skill assessment.
        </p>
        <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
