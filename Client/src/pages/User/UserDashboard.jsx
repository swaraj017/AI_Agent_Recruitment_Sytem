import React, { useState } from "react";
import { Sidebar, Header } from "../../components/layout";
import { Input, Badge, Button, Select } from "../../components/common";
import { JobCard } from "../../components/job";

// Navigation items for User/Job Seeker
const navItems = [
  {
    path: "/user/dashboard",
    label: "Dashboard",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
  },
  {
    path: "/user/jobs",
    label: "Job Board",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    path: "/user/schedule",
    label: "Schedule",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    path: "/user/messenger",
    label: "Messenger",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
];

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "UX Designer",
    company: "Dropbox",
    location: "Warszawa",
    salary: "8.8 - 13.7k PLN",
    tags: ["Remote", "Sketch"],
    postedAt: "2 days ago",
    type: "Full-time",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Twitch",
    location: "Wrocław",
    salary: "8.2 - 13.5k PLN",
    tags: ["Remote"],
    postedAt: "2 days ago",
    type: "Full-time",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Google",
    location: "Warszawa",
    salary: "7.5 - 12.5k PLN",
    tags: ["Remote", "JavaScript"],
    postedAt: "3 days ago",
    type: "Full-time",
  },
  {
    id: 4,
    title: "Motion Designer",
    company: "Adobe",
    location: "Remote",
    salary: "7.2 - 12.5k PLN",
    tags: ["Remote", "Adobe"],
    postedAt: "3 days ago",
    type: "Contract",
  },
  {
    id: 5,
    title: "Senior Frontend Developer",
    company: "Meta",
    location: "London",
    salary: "12.0 - 18.5k PLN",
    tags: ["Remote", "React"],
    postedAt: "1 day ago",
    type: "Full-time",
  },
];

const UserDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("anywhere");
  const [activeFilters, setActiveFilters] = useState([
    "Design",
    "Regular",
    "Full time",
    "B2B",
  ]);
  const [sortBy, setSortBy] = useState("date");

  // Mock user - in real app, get from context/auth
  const user = {
    fullName: "Anne Douglas",
    email: "anne@example.com",
    role: "Job Seeker",
  };

  const removeFilter = (filter) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  const locationOptions = [
    { value: "anywhere", label: "Anywhere" },
    { value: "remote", label: "Remote Only" },
    { value: "warsaw", label: "Warsaw" },
    { value: "london", label: "London" },
    { value: "new-york", label: "New York" },
  ];

  const sortOptions = [
    { value: "date", label: "Date" },
    { value: "salary-high", label: "Salary (High to Low)" },
    { value: "salary-low", label: "Salary (Low to High)" },
    { value: "relevance", label: "Relevance" },
  ];

  return (
    <div className="h-screen flex bg-gray-50/50">
      {/* Sidebar */}
      <Sidebar navItems={navItems} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <Header user={user} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {/* Page Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Job Board</h1>

          {/* Search & Filters Section */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
            <div className="flex items-center gap-3">
              {/* Search Input */}
              <div className="flex-1">
                <Input
                  placeholder="Search by job title, company, keywords"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  }
                  inputClassName="border-0 bg-gray-50/50"
                />
              </div>

              {/* Location Select */}
              <Select
                options={locationOptions}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                }
                selectClassName="border-0 bg-gray-50/50 min-w-[150px]"
              />

              {/* Filter Button */}
              <Button variant="outline" className="gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filters
                {activeFilters.length > 0 && (
                  <span className="w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">
                    {activeFilters.length}
                  </span>
                )}
              </Button>
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                {activeFilters.map((filter) => (
                  <Badge
                    key={filter}
                    variant="outline"
                    removable
                    onRemove={() => removeFilter(filter)}
                  >
                    {filter}
                  </Badge>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-gray-400 hover:text-gray-600 ml-2"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              We've found{" "}
              <span className="font-semibold text-secondary">523</span> jobs!
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-gray-900 font-medium bg-transparent border-0 focus:ring-0 cursor-pointer pr-6"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Job Cards */}
          <div className="space-y-3">
            {mockJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => console.log("Navigate to job:", job.id)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
