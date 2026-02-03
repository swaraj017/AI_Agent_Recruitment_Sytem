import React from "react";

const Header = ({ user }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-gray-500 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span>Quick Search</span>
        <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">ctrl + D</kbd>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg px-3 py-2 -mr-3 transition-colors">
        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
          <span className="text-secondary font-semibold text-sm">
            {user?.fullName?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || "U"}
          </span>
        </div>
        <span className="text-sm font-medium text-gray-700">
          {user?.fullName || user?.email || "User"}
        </span>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </header>
  );
};

export default Header;
