import React, { useState } from "react";
import { Sidebar, Header } from "../../components/layout";
import { Card, Badge, Button, Input } from "../../components/common";
import { HRJobCard, CandidateCard, StatsCard } from "../../components/job";

// Navigation items for HR
const navItems = [
  {
    path: "/hr/dashboard",
    label: "Dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    path: "/hr/post-job",
    label: "Post Job",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    path: "/hr/my-jobs",
    label: "My Jobs",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    path: "/hr/candidates",
    label: "Candidates",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    path: "/hr/interviews",
    label: "Interviews",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    path: "/hr/settings",
    label: "Settings",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
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
      matchedSkills: ["Figma", "Sketch", "User Research", "Prototyping", "Design Systems"],
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
    const matchesFilter = candidateFilter === "all" || c.status === candidateFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(searchCandidate.toLowerCase()) ||
      c.email.toLowerCase().includes(searchCandidate.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort by ATS score (top candidates first)
  const sortedCandidates = [...filteredCandidates].sort((a, b) => b.atsScore - a.atsScore);

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
    <div className="h-screen flex bg-gray-50/50">
      {/* Sidebar */}
      <Sidebar navItems={navItems} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <Header user={user} />

        {/* Page Content */}
        <main className="flex-1 overflow-hidden p-6">
          <div className="h-full flex flex-col">
            {/* Page Title & Actions */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 text-sm">Manage your job postings and candidates</p>
              </div>
              <Button
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                }
              >
                Post New Job
              </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <StatsCard
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
                label="Active Jobs"
                value={totalStats.activeJobs}
                change="2"
                changeType="positive"
              />
              <StatsCard
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                label="Total Applications"
                value={totalStats.totalApplications}
                change="12%"
                changeType="positive"
              />
              <StatsCard
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                label="Shortlisted"
                value={totalStats.totalShortlisted}
                change="5"
                changeType="positive"
              />
              <StatsCard
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
                label="Interviewed"
                value={totalStats.totalInterviewed}
              />
            </div>

            {/* Main Content Grid */}
            <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
              {/* Left: Job Listings */}
              <div className="flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900">Job Postings</h2>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setActiveTab("active")}
                      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                        activeTab === "active"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Active ({activeJobs.length})
                    </button>
                    <button
                      onClick={() => setActiveTab("closed")}
                      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                        activeTab === "closed"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Closed ({closedJobs.length})
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
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
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h2 className="font-semibold text-gray-900">
                            Candidates for {selectedJob.title}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {sortedCandidates.length} candidates • Sorted by ATS score
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedJob(null)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Search & Filter */}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Search candidates..."
                          value={searchCandidate}
                          onChange={(e) => setSearchCandidate(e.target.value)}
                          icon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          }
                          className="flex-1"
                        />
                        <select
                          value={candidateFilter}
                          onChange={(e) => setCandidateFilter(e.target.value)}
                          className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
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
                    {sortedCandidates.length > 0 && candidateFilter === "all" && (
                      <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-xl p-3 mb-3 flex items-center gap-3">
                        <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-secondary">Top Candidate</p>
                          <p className="text-xs text-gray-600">
                            {sortedCandidates[0].name} with {sortedCandidates[0].atsScore}% match
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Candidates List */}
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                      {sortedCandidates.length > 0 ? (
                        sortedCandidates.map((candidate, index) => (
                          <div key={candidate.id} className="relative">
                            {index < 3 && candidateFilter === "all" && (
                              <div className="absolute -left-2 top-4 w-6 h-6 bg-secondary text-white text-xs font-bold rounded-full flex items-center justify-center z-10">
                                {index + 1}
                              </div>
                            )}
                            <CandidateCard
                              candidate={candidate}
                              onViewProfile={() => handleViewProfile(candidate.id)}
                              onShortlist={() => handleShortlist(candidate.id)}
                              onReject={() => handleReject(candidate.id)}
                            />
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                          <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <p className="text-sm">No candidates found</p>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-white rounded-2xl border border-gray-100">
                    <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                    <p className="text-lg font-medium text-gray-600 mb-1">Select a job posting</p>
                    <p className="text-sm">Click on a job to view candidates and stats</p>
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