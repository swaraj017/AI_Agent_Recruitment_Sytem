import React, { useState } from "react";
import { Sidebar, Header } from "../../components/layout";
import { Card, Badge, Button, Input } from "../../components/common";
import { HRJobCard, CandidateCard, StatsCard } from "../../components/job";
import { hrNavItems } from "./hrNavItems";

// Mock jobs with detailed data
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    type: "Full-time",
    salary: "12k - 18k PLN",
    postedAt: "2 days ago",
    deadline: "Feb 28, 2026",
    status: "active",
    description: "We are looking for a Senior Frontend Developer to join our team...",
    requirements: ["3+ years React experience", "TypeScript proficiency", "REST API experience"],
    stats: { total: 45, shortlisted: 8, interviewed: 3, rejected: 12, pending: 22 },
    candidates: [
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
        interviewScore: 85,
        interviewDate: "Feb 10, 2026",
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
        interviewScore: 78,
        interviewDate: "Feb 8, 2026",
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
  },
  {
    id: 2,
    title: "UX Designer",
    company: "TechCorp",
    location: "Warsaw",
    type: "Full-time",
    salary: "8k - 12k PLN",
    postedAt: "5 days ago",
    deadline: "Mar 15, 2026",
    status: "active",
    description: "Looking for a creative UX Designer...",
    requirements: ["Figma expertise", "User research skills", "3+ years experience"],
    stats: { total: 32, shortlisted: 5, interviewed: 2, rejected: 8, pending: 17 },
    candidates: [
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
        interviewScore: 92,
        interviewDate: "Feb 12, 2026",
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
  },
  {
    id: 3,
    title: "Product Manager",
    company: "TechCorp",
    location: "Hybrid",
    type: "Full-time",
    salary: "15k - 22k PLN",
    postedAt: "1 week ago",
    deadline: "Feb 20, 2026",
    status: "active",
    description: "Seeking an experienced Product Manager...",
    requirements: ["5+ years PM experience", "Agile methodology", "Technical background preferred"],
    stats: { total: 28, shortlisted: 6, interviewed: 4, rejected: 5, pending: 13 },
    candidates: [],
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "TechCorp",
    location: "Remote",
    type: "Contract",
    salary: "100 - 150 PLN/h",
    postedAt: "2 weeks ago",
    deadline: "Jan 30, 2026",
    status: "closed",
    description: "Backend Developer position (closed)...",
    requirements: ["Node.js", "Python", "AWS"],
    stats: { total: 52, shortlisted: 10, interviewed: 5, rejected: 30, pending: 7 },
    hiredCandidate: {
      id: 10,
      name: "Alex Kumar",
      email: "alex.k@email.com",
      atsScore: 94,
      interviewScore: 91,
    },
    candidates: [],
  },
];

const MyJobs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("active");
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // list, detail, results
  const [candidateFilter, setCandidateFilter] = useState("all");
  const [searchCandidate, setSearchCandidate] = useState("");

  const user = {
    fullName: "HR Manager",
    email: "hr@company.com",
    role: "HR",
  };

  const activeJobs = mockJobs.filter((j) => j.status === "active");
  const closedJobs = mockJobs.filter((j) => j.status === "closed");
  const displayedJobs = activeTab === "active" ? activeJobs : closedJobs;

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setViewMode("detail");
  };

  const handleViewResults = (job) => {
    setSelectedJob(job);
    setViewMode("results");
  };

  const handleBack = () => {
    if (viewMode === "results") {
      setViewMode("detail");
    } else {
      setSelectedJob(null);
      setViewMode("list");
    }
  };

  const filteredCandidates = selectedJob?.candidates?.filter((c) => {
    const matchesFilter = candidateFilter === "all" || c.status === candidateFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(searchCandidate.toLowerCase()) ||
      c.email.toLowerCase().includes(searchCandidate.toLowerCase());
    return matchesFilter && matchesSearch;
  }) || [];

  const sortedCandidates = [...filteredCandidates].sort((a, b) => b.atsScore - a.atsScore);

  // Get top candidates (interviewed + shortlisted with scores)
  const topCandidates = selectedJob?.candidates
    ?.filter((c) => c.interviewScore)
    ?.sort((a, b) => (b.interviewScore || 0) - (a.interviewScore || 0))
    ?.slice(0, 5) || [];

  return (
    <div className="h-screen flex bg-background">
      <Sidebar navItems={hrNavItems} isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className={`flex-1 flex flex-col transition-all duration-200 ${sidebarOpen ? 'lg:ml-56' : 'lg:ml-16'}`}>
        <Header user={user} onMenuClick={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

        <main className="flex-1 overflow-hidden p-6">
          <div className="h-full flex flex-col">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {viewMode !== "list" && (
                  <button
                    onClick={handleBack}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                <div>
                  <h1 className="text-xl font-semibold text-foreground">
                    {viewMode === "list" && "My Jobs"}
                    {viewMode === "detail" && selectedJob?.title}
                    {viewMode === "results" && `Results: ${selectedJob?.title}`}
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    {viewMode === "list" && "Manage your job postings and view candidates"}
                    {viewMode === "detail" && `${selectedJob?.location} • ${selectedJob?.type}`}
                    {viewMode === "results" && "Interview scores and recommendations"}
                  </p>
                </div>
              </div>

              {viewMode === "list" && (
                <Button
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  }
                  onClick={() => window.location.href = "/hr/post-job"}
                >
                  Post New Job
                </Button>
              )}

              {viewMode === "detail" && (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleViewResults(selectedJob)}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    View Results
                  </Button>
                  <Button variant="outline">Edit Job</Button>
                </div>
              )}
            </div>

            {/* List View */}
            {viewMode === "list" && (
              <>
                {/* Tabs */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex bg-muted rounded-lg p-1">
                    <button
                      onClick={() => setActiveTab("active")}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        activeTab === "active"
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Active Jobs ({activeJobs.length})
                    </button>
                    <button
                      onClick={() => setActiveTab("closed")}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        activeTab === "closed"
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Closed Jobs ({closedJobs.length})
                    </button>
                  </div>
                </div>

                {/* Jobs Grid */}
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                  <div className="grid grid-cols-2 gap-4">
                    {displayedJobs.map((job) => (
                      <Card
                        key={job.id}
                        className="cursor-pointer hover:shadow-lg transition-all hover:border-foreground/30"
                        onClick={() => handleJobClick(job)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-foreground">{job.title}</h3>
                            <p className="text-sm text-muted-foreground">{job.location} • {job.type}</p>
                          </div>
                          <Badge variant={job.status === "active" ? "success" : "outline"}>
                            {job.status}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">{job.salary}</p>

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-2 mb-4">
                          <div className="text-center p-2 bg-muted rounded-lg">
                            <p className="text-lg font-semibold text-foreground">{job.stats.total}</p>
                            <p className="text-[10px] text-muted-foreground uppercase">Total</p>
                          </div>
                          <div className="text-center p-2 bg-blue-50 rounded-lg">
                            <p className="text-lg font-semibold text-blue-600">{job.stats.pending}</p>
                            <p className="text-[10px] text-muted-foreground uppercase">Pending</p>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded-lg">
                            <p className="text-lg font-semibold text-green-600">{job.stats.shortlisted}</p>
                            <p className="text-[10px] text-muted-foreground uppercase">Shortlisted</p>
                          </div>
                          <div className="text-center p-2 bg-purple-50 rounded-lg">
                            <p className="text-lg font-semibold text-purple-600">{job.stats.interviewed}</p>
                            <p className="text-[10px] text-gray-500 uppercase">Interviewed</p>
                          </div>
                        </div>

                        {/* Hired candidate badge for closed jobs */}
                        {job.status === "closed" && job.hiredCandidate && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                            <p className="text-xs text-green-600 font-medium mb-1">Hired Candidate</p>
                            <p className="font-semibold text-gray-900">{job.hiredCandidate.name}</p>
                            <p className="text-xs text-gray-500">
                              ATS: {job.hiredCandidate.atsScore}% • Interview: {job.hiredCandidate.interviewScore}%
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>Posted {job.postedAt}</span>
                          <span>Deadline: {job.deadline}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Detail View */}
            {viewMode === "detail" && selectedJob && (
              <div className="flex-1 grid grid-cols-3 gap-6 min-h-0">
                {/* Job Info & Stats */}
                <div className="col-span-1 space-y-4 overflow-y-auto scrollbar-hide">
                  {/* Stats Cards */}
                  <Card>
                    <h3 className="font-semibold text-gray-900 mb-4">Application Stats</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-gray-50 rounded-xl">
                        <p className="text-2xl font-bold text-gray-900">{selectedJob.stats.total}</p>
                        <p className="text-xs text-gray-500">Total</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <p className="text-2xl font-bold text-blue-600">{selectedJob.stats.pending}</p>
                        <p className="text-xs text-gray-500">Pending</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <p className="text-2xl font-bold text-green-600">{selectedJob.stats.shortlisted}</p>
                        <p className="text-xs text-gray-500">Shortlisted</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-xl">
                        <p className="text-2xl font-bold text-purple-600">{selectedJob.stats.interviewed}</p>
                        <p className="text-xs text-gray-500">Interviewed</p>
                      </div>
                    </div>
                  </Card>

                  {/* Job Details */}
                  <Card>
                    <h3 className="font-semibold text-gray-900 mb-3">Job Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Salary</span>
                        <span className="font-medium">{selectedJob.salary}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Posted</span>
                        <span className="font-medium">{selectedJob.postedAt}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Deadline</span>
                        <span className="font-medium">{selectedJob.deadline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status</span>
                        <Badge variant={selectedJob.status === "active" ? "success" : "outline"}>
                          {selectedJob.status}
                        </Badge>
                      </div>
                    </div>
                  </Card>

                  {/* Requirements */}
                  <Card>
                    <h3 className="font-semibold text-gray-900 mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                {/* Candidates List */}
                <div className="col-span-2 flex flex-col min-h-0">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Candidates ({filteredCandidates.length})</h3>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Search candidates..."
                        value={searchCandidate}
                        onChange={(e) => setSearchCandidate(e.target.value)}
                        className="w-64"
                        icon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        }
                      />
                      <select
                        value={candidateFilter}
                        onChange={(e) => setCandidateFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                      >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="interviewed">Interviewed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

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
                            onViewProfile={() => console.log("View profile:", candidate.id)}
                            onShortlist={() => console.log("Shortlist:", candidate.id)}
                            onReject={() => console.log("Reject:", candidate.id)}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-sm">No candidates found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Results View */}
            {viewMode === "results" && selectedJob && (
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="grid grid-cols-3 gap-6">
                  {/* Summary Stats */}
                  <div className="col-span-3 grid grid-cols-4 gap-4">
                    <StatsCard
                      icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      }
                      label="Total Applicants"
                      value={selectedJob.stats.total}
                    />
                    <StatsCard
                      icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      label="Shortlisted"
                      value={selectedJob.stats.shortlisted}
                      change={`${Math.round((selectedJob.stats.shortlisted / selectedJob.stats.total) * 100)}%`}
                      changeType="positive"
                    />
                    <StatsCard
                      icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      }
                      label="Interviewed"
                      value={selectedJob.stats.interviewed}
                    />
                    <StatsCard
                      icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      }
                      label="Avg. ATS Score"
                      value={`${Math.round(selectedJob.candidates.reduce((acc, c) => acc + c.atsScore, 0) / (selectedJob.candidates.length || 1))}%`}
                    />
                  </div>

                  {/* Top Candidates by Interview Score */}
                  <div className="col-span-2">
                    <Card>
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Top Candidates (by Interview Score)
                      </h3>

                      {topCandidates.length > 0 ? (
                        <div className="space-y-3">
                          {topCandidates.map((candidate, index) => (
                            <div
                              key={candidate.id}
                              className={`flex items-center gap-4 p-4 rounded-xl ${
                                index === 0 ? "bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200" : "bg-gray-50"
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                index === 0 ? "bg-yellow-500 text-white" :
                                index === 1 ? "bg-gray-400 text-white" :
                                index === 2 ? "bg-orange-400 text-white" : "bg-gray-300 text-gray-600"
                              }`}>
                                {index + 1}
                              </div>
                              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                                <span className="text-secondary font-semibold">
                                  {candidate.name.charAt(0)}
                                </span>
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">{candidate.name}</p>
                                <p className="text-xs text-gray-500">{candidate.experience} • {candidate.education}</p>
                              </div>
                              <div className="text-center px-3">
                                <p className="text-lg font-bold text-green-600">{candidate.atsScore}%</p>
                                <p className="text-[10px] text-gray-500">ATS</p>
                              </div>
                              <div className="text-center px-3">
                                <p className="text-lg font-bold text-purple-600">{candidate.interviewScore}%</p>
                                <p className="text-[10px] text-gray-500">Interview</p>
                              </div>
                              <Button size="sm">View Details</Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-400">
                          <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-sm">No interviewed candidates yet</p>
                        </div>
                      )}
                    </Card>
                  </div>

                  {/* AI Recommendations */}
                  <div className="col-span-1">
                    <Card className="bg-gradient-to-br from-secondary/5 to-purple-50">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        AI Recommendations
                      </h3>

                      <div className="space-y-3">
                        {topCandidates.slice(0, 3).map((candidate, index) => (
                          <div key={candidate.id} className="bg-white rounded-xl p-3 border border-secondary/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary" className="text-[10px]">
                                #{index + 1} Recommended
                              </Badge>
                            </div>
                            <p className="font-medium text-gray-900 text-sm">{candidate.name}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Strong match based on skills alignment and interview performance
                            </p>
                            <div className="flex gap-2 mt-2">
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                {candidate.atsScore}% ATS
                              </span>
                              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                {candidate.interviewScore}% Interview
                              </span>
                            </div>
                          </div>
                        ))}

                        {topCandidates.length === 0 && (
                          <p className="text-sm text-gray-500 text-center py-4">
                            Complete interviews to see AI recommendations
                          </p>
                        )}
                      </div>
                    </Card>
                  </div>

                  {/* Score Distribution */}
                  <div className="col-span-3">
                    <Card>
                      <h3 className="font-semibold text-gray-900 mb-4">Score Distribution</h3>
                      <div className="grid grid-cols-5 gap-4">
                        {[
                          { range: "90-100%", count: selectedJob.candidates.filter(c => c.atsScore >= 90).length, color: "bg-green-500" },
                          { range: "80-89%", count: selectedJob.candidates.filter(c => c.atsScore >= 80 && c.atsScore < 90).length, color: "bg-green-400" },
                          { range: "70-79%", count: selectedJob.candidates.filter(c => c.atsScore >= 70 && c.atsScore < 80).length, color: "bg-yellow-400" },
                          { range: "60-69%", count: selectedJob.candidates.filter(c => c.atsScore >= 60 && c.atsScore < 70).length, color: "bg-orange-400" },
                          { range: "Below 60%", count: selectedJob.candidates.filter(c => c.atsScore < 60).length, color: "bg-red-400" },
                        ].map((item) => (
                          <div key={item.range} className="text-center">
                            <div className="h-24 bg-gray-100 rounded-lg flex items-end justify-center p-2 mb-2">
                              <div
                                className={`w-full ${item.color} rounded transition-all`}
                                style={{
                                  height: `${Math.max((item.count / (selectedJob.candidates.length || 1)) * 100, 10)}%`,
                                }}
                              />
                            </div>
                            <p className="text-lg font-bold text-gray-900">{item.count}</p>
                            <p className="text-xs text-gray-500">{item.range}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyJobs;
