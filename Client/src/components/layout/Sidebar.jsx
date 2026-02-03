import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../common";

const Sidebar = ({ navItems = [] }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-secondary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900">RecruitAI</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-secondary text-white shadow-lg shadow-secondary/30"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Upgrade Card */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-5 relative overflow-hidden">
          {/* Illustration */}
          <div className="mb-4">
            <div className="w-16 h-16 relative">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <circle cx="32" cy="48" rx="20" ry="8" fill="#E8E8F0"/>
                <rect x="20" y="20" width="24" height="30" rx="2" fill="#F5F5FA" stroke="#DDD" strokeWidth="1"/>
                <rect x="24" y="24" width="16" height="3" rx="1" fill="#B8B8D0"/>
                <rect x="24" y="30" width="12" height="2" rx="1" fill="#D8D8E8"/>
                <rect x="24" y="35" width="14" height="2" rx="1" fill="#D8D8E8"/>
                <circle cx="44" cy="18" r="8" fill="#774FE6"/>
                <path d="M41 18l2 2 4-4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          
          <h3 className="font-semibold text-gray-900 text-sm">Get Upgrade</h3>
          <p className="text-xs text-gray-500 mt-1 mb-4">
            Step to the next level, with more features
          </p>
          <Button size="sm" className="w-full">
            Learn more
          </Button>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 w-full transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
