import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ user, onMenuClick, sidebarOpen }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signin");
  };
  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 sticky top-0 z-30">
      {/* Left side - Menu toggle (mobile only) + Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Only show hamburger on mobile - desktop uses sidebar's own toggle */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md hover:bg-muted text-muted-foreground transition-colors lg:hidden"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden sm:block lg:hidden h-5 w-px bg-border" />

        <nav className="flex items-center gap-1 text-sm">
          <span className="text-muted-foreground">Dashboard</span>
        </nav>
      </div>

      {/* Right side - User */}
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-md hover:bg-muted text-muted-foreground transition-colors relative">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand rounded-full" />
        </button>

        <div className="h-5 w-px bg-border" />

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1.5 rounded-md hover:bg-muted transition-colors hover:cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center">
              <span className="text-xs font-medium">
                {user?.fullName?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
            <span className="text-sm font-medium text-foreground hidden sm:block">
              {user?.fullName?.split(' ')[0] || "User"}
            </span>
            <svg className="w-4 h-4 text-muted-foreground hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg py-1 border border-border z-50">
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors rounded-md hover:cursor-pointer hover:text-red-500"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
