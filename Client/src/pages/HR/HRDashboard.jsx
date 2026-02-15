import React, { useState } from "react";
import { Sidebar, Header } from "../../components/layout";
import { Card, Badge, Button, Input } from "../../components/common";
import { HRJobCard, CandidateCard, StatsCard } from "../../components/job";

// Navigation items for HR - simplified with less icons
const navItems = [
  { path: "/hr/dashboard", label: "Dashboard" },
  { path: "/hr/post-job", label: "Post Job" },
  { path: "/hr/my-jobs", label: "My Jobs" },
  { path: "/hr/candidates", label: "Candidates" },
  { path: "/hr/interviews", label: "Interviews" },
  { path: "/hr/settings", label: "Settings" },
];

// Mock data for jobs
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    location: "Remote",
    type: "Full-time",
    salary: "12k - 18k PLN",
    postedAt: "2 days ago",
    deadline: "Feb 28, 2026",
    status: "active",
    stats: { total: 45, shortlisted: 8, interviewed: 3, rejected: 12 },
  },
  {
    id: 2,
    title: "UX Designer",
    location: "Warsaw",
    type: "Full-time",
    salary: "8k - 12k PLN",
    postedAt: "5 days ago",
    deadline: "Mar 15, 2026",
    status: "active",
    stats: { total: 32, shortlisted: 5, interviewed: 2, rejected: 8 },
  },
  {
    id: 3,
    title: "Product Manager",
    location: "Hybrid",
    type: "Full-time",
    salary: "15k - 22k PLN",
    postedAt: "1 week ago",
    deadline: "Feb 20, 2026",
    status: "active",
    stats: { total: 28, shortlisted: 6, interviewed: 4, rejected: 5 },
  },
  {
    id: 4,
    title: "Backend Developer",
    location: "Remote",
    type: "Contract",
    salary: "100 - 150 PLN/h",
    postedAt: "2 weeks ago",
    deadline: "Jan 30, 2026",
    status: "closed",
    stats: { total: 52, shortlisted: 10, interviewed: 5, rejected: 30 },
  },
];

// Mock candidates data
const mockCandidates = {
  1: [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      appliedAt: "2 days ago",
      status: "shortlisted",
      atsScore: 92,
      matchedSkills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
      experience: "5 years",
      education: "MSc Computer Science",
    },
    {
      id: 2,
      name: "Emily Johnson",
      email: "emily.j@email.com",
      appliedAt: "3 days ago",
      status: "interviewed",
      atsScore: 88,
      matchedSkills: ["React", "JavaScript", "CSS", "Figma"],
      experience: "4 years",
      education: "BSc Software Engineering",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "m.brown@email.com",
      appliedAt: "3 days ago",
      status: "pending",
      atsScore: 85,
      matchedSkills: ["Vue.js", "TypeScript", "Node.js"],
      experience: "6 years",
      education: "BSc Computer Science",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.w@email.com",
      appliedAt: "4 days ago",
      status: "pending",
      atsScore: 78,
      matchedSkills: ["React", "JavaScript", "Redux"],
      experience: "3 years",
      education: "BSc Information Technology",
    },
    {
      id: 5,
      name: "David Lee",
      email: "d.lee@email.com",
      appliedAt: "5 days ago",
      status: "rejected",
      atsScore: 45,
      matchedSkills: ["HTML", "CSS"],
      experience: "1 year",
      education: "Bootcamp Graduate",
    },
  ],
  2: [
    {
      id: 6,
      name: "Anna Martinez",
      email: "anna.m@email.com",
      appliedAt: "1 day ago",
      status: "shortlisted",
      atsScore: 95,
      matchedSkills: [
        "Figma",
        "Sketch",
        "User Research",
        "Prototyping",
        "Design Systems",
      ],
      experience: "6 years",
      education: "MA Design",
    },
    {
      id: 7,
      name: "Chris Taylor",
      email: "chris.t@email.com",
      appliedAt: "2 days ago",
      status: "pending",
      atsScore: 82,
      matchedSkills: ["Figma", "Adobe XD", "UI Design"],
      experience: "3 years",
      education: "BA Graphic Design",
    },
  ],
};

const HRDashboard = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTab, setActiveTab] = useState("active");
  const [candidateFilter, setCandidateFilter] = useState("all");
  const [searchCandidate, setSearchCandidate] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock user
  const user = {
    fullName: "HR Manager",
    email: "hr@company.com",
    role: "HR",
  };

  const activeJobs = mockJobs.filter((j) => j.status === "active");
  const closedJobs = mockJobs.filter((j) => j.status === "closed");

  const displayedJobs = activeTab === "active" ? activeJobs : closedJobs;

  const candidates = selectedJob ? mockCandidates[selectedJob.id] || [] : [];

  const filteredCandidates = candidates.filter((c) => {
    const matchesFilter =
      candidateFilter === "all" || c.status === candidateFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(searchCandidate.toLowerCase()) ||
      c.email.toLowerCase().includes(searchCandidate.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort by ATS score (top candidates first)
  const sortedCandidates = [...filteredCandidates].sort(
    (a, b) => b.atsScore - a.atsScore,
  );

  const totalStats = {
    totalApplications: mockJobs.reduce((acc, j) => acc + j.stats.total, 0),
    totalShortlisted: mockJobs.reduce((acc, j) => acc + j.stats.shortlisted, 0),
    totalInterviewed: mockJobs.reduce((acc, j) => acc + j.stats.interviewed, 0),
    activeJobs: activeJobs.length,
  };

  const handleShortlist = (candidateId) => {
    console.log("Shortlist candidate:", candidateId);
    // TODO: API call
  };

  const handleReject = (candidateId) => {
    console.log("Reject candidate:", candidateId);
    // TODO: API call
  };

  const handleViewProfile = (candidateId) => {
    console.log("View profile:", candidateId);
    // TODO: Navigate to profile
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <Sidebar navItems={navItems} isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-200 ${sidebarOpen ? 'lg:ml-56' : 'lg:ml-16'}`}>
        {/* Header */}
        <Header user={user} onMenuClick={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 overflow-hidden p-4 lg:p-6">
          <div className="h-full flex flex-col">
            {/* Page Title & Actions */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground text-sm">
                  Manage your job postings and candidates
                </p>
              </div>
              <Button>
                Post New Job
              </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
              <StatsCard
                label="Active Jobs"
                value={totalStats.activeJobs}
                change="+2"
                changeType="positive"
              />
              <StatsCard
                label="Applications"
                value={totalStats.totalApplications}
                change="+12%"
                changeType="positive"
              />
              <StatsCard
                label="Shortlisted"
                value={totalStats.totalShortlisted}
                change="+5"
                changeType="positive"
              />
              <StatsCard
                label="Interviewed"
                value={totalStats.totalInterviewed}
              />
            </div>

            {/* Main Content Grid */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
              {/* Left: Job Listings */}
              <div className="flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-medium text-foreground">Job Postings</h2>
                  <div className="flex bg-muted rounded-md p-0.5">
                    <button
                      onClick={() => setActiveTab("active")}
                      className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                        activeTab === "active"
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Active ({activeJobs.length})
                    </button>
                    <button
                      onClick={() => setActiveTab("closed")}
                      className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                        activeTab === "closed"
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Closed ({closedJobs.length})
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                  {displayedJobs.map((job) => (
                    <HRJobCard
                      key={job.id}
                      job={job}
                      isSelected={selectedJob?.id === job.id}
                      onClick={() => setSelectedJob(job)}
                    />
                  ))}
                </div>
              </div>

              {/* Right: Candidates Panel */}
              <div className="flex flex-col min-h-0">
                {selectedJob ? (
                  <>
                    {/* Candidates Header */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h2 className="font-medium text-foreground">
                            Candidates for {selectedJob.title}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {sortedCandidates.length} candidates
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedJob(null)}
                          className="p-1.5 hover:bg-muted rounded-md transition-colors"
                        >
                          <svg
                            className="w-4 h-4 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Search & Filter */}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Search candidates..."
                          value={searchCandidate}
                          onChange={(e) => setSearchCandidate(e.target.value)}
                          className="flex-1"
                        />
                        <select
                          value={candidateFilter}
                          onChange={(e) => setCandidateFilter(e.target.value)}
                          className="h-9 px-3 rounded-md border border-border text-sm bg-background focus:border-foreground focus:ring-1 focus:ring-foreground/10 outline-none"
                        >
                          <option value="all">All Status</option>
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="interviewed">Interviewed</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>

                    {/* Top Candidates Badge */}
                    {sortedCandidates.length > 0 &&
                      candidateFilter === "all" && (
                        <div className="bg-muted/50 border border-border rounded-md p-3 mb-3 flex items-center gap-3">
                          <div className="w-7 h-7 bg-foreground rounded-md flex items-center justify-center">
                            <span className="text-background text-xs font-semibold">1</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              Top Candidate
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {sortedCandidates[0].name} · {sortedCandidates[0].atsScore}% match
                            </p>
                          </div>
                        </div>
                      )}

                    {/* Candidates List */}
                    <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                      {sortedCandidates.length > 0 ? (
                        sortedCandidates.map((candidate, index) => (
                          <div key={candidate.id} className="relative">
                            {index < 3 && candidateFilter === "all" && (
                              <div className="absolute -left-1 top-3 w-5 h-5 bg-foreground text-background text-xs font-medium rounded flex items-center justify-center z-10">
                                {index + 1}
                              </div>
                            )}
                            <CandidateCard
                              candidate={candidate}
                              onViewProfile={() =>
                                handleViewProfile(candidate.id)
                              }
                              onShortlist={() => handleShortlist(candidate.id)}
                              onReject={() => handleReject(candidate.id)}
                            />
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                          <p className="text-sm">No candidates found</p>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground bg-card rounded-lg border border-border">
                    <p className="text-sm font-medium text-foreground mb-1">
                      Select a job posting
                    </p>
                    <p className="text-xs">
                      Click on a job to view candidates
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HRDashboard;
