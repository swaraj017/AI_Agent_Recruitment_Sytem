import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Header } from "../../components/layout";
import { Card, Badge, Button, Input, Select } from "../../components/common";

// Navigation items for User/Job Seeker
const navItems = [
  { path: "/user/dashboard", label: "Dashboard" },
  { path: "/user/jobs", label: "Job Board" },
  { path: "/user/applications", label: "My Applications" },
  { path: "/user/interviews", label: "Interviews" },
  { path: "/user/profile", label: "My Profile" },
  { path: "/user/settings", label: "Settings" },
];

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "UX Designer",
    company: "Dropbox",
    location: "Warszawa",
    salary: "8.8 - 13.7k PLN",
    type: "Full-time",
    workMode: "Remote",
    postedAt: "2 days ago",
    description: "We are looking for an experienced UX Designer to join our team...",
    skills: ["Figma", "Sketch", "User Research", "Prototyping"],
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Twitch",
    location: "Wrocław",
    salary: "8.2 - 13.5k PLN",
    type: "Full-time",
    workMode: "Remote",
    postedAt: "2 days ago",
    description: "Join our design team to create amazing streaming experiences...",
    skills: ["UI Design", "Design Systems", "Figma"],
  },
  {
    id: 3,
    title: "Senior Frontend Developer",
    company: "Google",
    location: "Warszawa",
    salary: "15.5 - 22.5k PLN",
    type: "Full-time",
    workMode: "Hybrid",
    postedAt: "3 days ago",
    description: "Work on cutting-edge web applications at scale...",
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
  },
  {
    id: 4,
    title: "Motion Designer",
    company: "Adobe",
    location: "Remote",
    salary: "7.2 - 12.5k PLN",
    type: "Contract",
    workMode: "Remote",
    postedAt: "3 days ago",
    description: "Create stunning motion graphics for our products...",
    skills: ["After Effects", "Cinema 4D", "Illustration"],
  },
  {
    id: 5,
    title: "Backend Developer",
    company: "Meta",
    location: "London",
    salary: "18.0 - 25.5k PLN",
    type: "Full-time",
    workMode: "On-site",
    postedAt: "1 day ago",
    description: "Build scalable backend systems for billions of users...",
    skills: ["Python", "Java", "Distributed Systems", "AWS"],
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "Spotify",
    location: "Stockholm",
    salary: "14.0 - 20.0k PLN",
    type: "Full-time",
    workMode: "Hybrid",
    postedAt: "4 days ago",
    description: "Use data to improve music recommendations...",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
  },
];

const JobBoard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [workMode, setWorkMode] = useState("all");

  const user = {
    fullName: "Anne Douglas",
    email: "anne@example.com",
  };

  const locationOptions = [
    { value: "all", label: "All Locations" },
    { value: "remote", label: "Remote" },
    { value: "warszawa", label: "Warszawa" },
    { value: "london", label: "London" },
    { value: "wroclaw", label: "Wrocław" },
  ];

  const jobTypeOptions = [
    { value: "all", label: "All Types" },
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
  ];

  const workModeOptions = [
    { value: "all", label: "All Modes" },
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "on-site", label: "On-site" },
  ];

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesLocation =
      location === "all" ||
      job.location.toLowerCase().includes(location.toLowerCase());
    const matchesType =
      jobType === "all" || job.type.toLowerCase() === jobType.toLowerCase();
    const matchesMode =
      workMode === "all" ||
      job.workMode.toLowerCase() === workMode.toLowerCase();

    return matchesSearch && matchesLocation && matchesType && matchesMode;
  });

  const getLogoColor = (name) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-green-500",
      "bg-orange-500",
    ];
    const index = name?.charCodeAt(0) % colors.length || 0;
    return colors[index];
  };

  const handleJobClick = (jobId) => {
    navigate(`/user/jobs/${jobId}`);
  };

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar
        navItems={navItems}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-200 ${
          sidebarOpen ? "lg:ml-56" : "lg:ml-16"
        }`}
      >
        <Header
          user={user}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-foreground">Job Board</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Find your dream job from {mockJobs.length}+ openings
            </p>
          </div>

          {/* Search & Filters */}
          <Card className="mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <Input
                  placeholder="Search jobs, companies, or skills..."
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
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <Select
                  options={locationOptions}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="min-w-[140px]"
                />
                <Select
                  options={jobTypeOptions}
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="min-w-[120px]"
                />
                <Select
                  options={workModeOptions}
                  value={workMode}
                  onChange={(e) => setWorkMode(e.target.value)}
                  className="min-w-[120px]"
                />
              </div>
            </div>
          </Card>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredJobs.length}</span> jobs
            </p>
          </div>

          {/* Job List */}
          <div className="space-y-3">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                hover
                className="cursor-pointer"
                onClick={() => handleJobClick(job.id)}
              >
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0 ${getLogoColor(
                      job.company
                    )}`}
                  >
                    {job.company?.charAt(0)}
                  </div>

                  {/* Job Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-foreground hover:text-brand transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {job.company} • {job.location}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-medium text-foreground">{job.salary}</p>
                        <p className="text-xs text-muted-foreground">{job.postedAt}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <Badge variant="outline">{job.type}</Badge>
                      <Badge variant="outline">{job.workMode}</Badge>
                      {job.skills.slice(0, 3).map((skill, idx) => (
                        <Badge key={idx} variant="default" className="text-[10px]">
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{job.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <Card className="text-center py-12">
              <svg
                className="w-12 h-12 text-muted-foreground mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 className="font-medium text-foreground mb-1">No jobs found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default JobBoard;
