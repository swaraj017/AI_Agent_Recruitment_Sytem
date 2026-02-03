import React, { useState } from "react";
import { Sidebar, Header } from "../../components/layout";
import { Card, Badge, Button, Input } from "../../components/common";
import { CandidateCard } from "../../components/job";

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

// All candidates from all jobs
const allCandidates = [
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
    appliedFor: "Senior Frontend Developer",
    jobId: 1,
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
    appliedFor: "Senior Frontend Developer",
    jobId: 1,
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
    appliedFor: "Senior Frontend Developer",
    jobId: 1,
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
    appliedFor: "Senior Frontend Developer",
    jobId: 1,
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
    appliedFor: "Senior Frontend Developer",
    jobId: 1,
  },
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
    appliedFor: "UX Designer",
    jobId: 2,
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
    appliedFor: "UX Designer",
    jobId: 2,
  },
  {
    id: 8,
    name: "Jessica Chen",
    email: "jessica.c@email.com",
    appliedAt: "1 day ago",
    status: "pending",
    atsScore: 89,
    matchedSkills: ["Agile", "Scrum", "Jira", "Product Strategy"],
    experience: "7 years",
    education: "MBA",
    appliedFor: "Product Manager",
    jobId: 3,
  },
  {
    id: 9,
    name: "Ryan O'Connor",
    email: "ryan.o@email.com",
    appliedAt: "3 days ago",
    status: "interviewed",
    atsScore: 91,
    matchedSkills: ["Node.js", "Python", "AWS", "Docker", "PostgreSQL"],
    experience: "5 years",
    education: "BSc Computer Science",
    appliedFor: "Backend Developer",
    jobId: 4,
  },
];

const jobs = [
  { id: 1, title: "Senior Frontend Developer" },
  { id: 2, title: "UX Designer" },
  { id: 3, title: "Product Manager" },
  { id: 4, title: "Backend Developer" },
];

const Candidates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [sortBy, setSortBy] = useState("atsScore");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const user = {
    fullName: "HR Manager",
    email: "hr@company.com",
    role: "HR",
  };

  // Filter and sort candidates
  const filteredCandidates = allCandidates
    .filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.matchedSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      const matchesJob = jobFilter === "all" || c.jobId === parseInt(jobFilter);
      return matchesSearch && matchesStatus && matchesJob;
    })
    .sort((a, b) => {
      if (sortBy === "atsScore") return b.atsScore - a.atsScore;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "recent") return 0; // Already sorted by recent
      return 0;
    });

  const statusCounts = {
    all: allCandidates.length,
    pending: allCandidates.filter((c) => c.status === "pending").length,
    shortlisted: allCandidates.filter((c) => c.status === "shortlisted").length,
    interviewed: allCandidates.filter((c) => c.status === "interviewed").length,
    rejected: allCandidates.filter((c) => c.status === "rejected").length,
  };

  const handleShortlist = (id) => {
    console.log("Shortlist:", id);
  };

  const handleReject = (id) => {
    console.log("Reject:", id);
  };

  const handleViewProfile = (candidate) => {
    setSelectedCandidate(candidate);
  };

  return (
    <div className="h-screen flex bg-gray-50/50">
      <Sidebar navItems={navItems} />

      <div className="flex-1 flex flex-col ml-64">
        <Header user={user} />

        <main className="flex-1 overflow-hidden p-6">
          <div className="h-full flex flex-col">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Candidates</h1>
                <p className="text-gray-500 text-sm">View and manage all applicants across jobs</p>
              </div>
              <Button variant="outline">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export List
              </Button>
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              {[
                { key: "all", label: "All Candidates" },
                { key: "pending", label: "Pending" },
                { key: "shortlisted", label: "Shortlisted" },
                { key: "interviewed", label: "Interviewed" },
                { key: "rejected", label: "Rejected" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setStatusFilter(tab.key)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    statusFilter === tab.key
                      ? "bg-secondary text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {tab.label} ({statusCounts[tab.key]})
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
              <Input
                placeholder="Search by name, email, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 max-w-md"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
              />

              <select
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
              >
                <option value="all">All Jobs</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>{job.title}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
              >
                <option value="atsScore">Sort by ATS Score</option>
                <option value="name">Sort by Name</option>
                <option value="recent">Sort by Recent</option>
              </select>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex gap-6 min-h-0">
              {/* Candidates Grid */}
              <div className={`flex-1 overflow-y-auto scrollbar-hide ${selectedCandidate ? "w-2/3" : "w-full"}`}>
                <div className="grid grid-cols-2 gap-4 pb-4">
                  {filteredCandidates.map((candidate) => (
                    <div key={candidate.id} className="relative">
                      <Card
                        className={`cursor-pointer transition-all ${
                          selectedCandidate?.id === candidate.id
                            ? "ring-2 ring-secondary"
                            : "hover:shadow-md"
                        }`}
                        onClick={() => handleViewProfile(candidate)}
                      >
                        <div className="flex items-start gap-4">
                          {/* Avatar */}
                          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-secondary font-semibold text-lg">
                              {candidate.name.charAt(0)}
                            </span>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                              <Badge
                                variant={
                                  candidate.status === "shortlisted" ? "success" :
                                  candidate.status === "interviewed" ? "primary" :
                                  candidate.status === "rejected" ? "danger" : "warning"
                                }
                                className="capitalize text-[10px]"
                              >
                                {candidate.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 truncate">{candidate.email}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              Applied for: <span className="text-gray-600">{candidate.appliedFor}</span>
                            </p>
                          </div>

                          {/* ATS Score */}
                          <div className={`px-3 py-2 rounded-xl ${
                            candidate.atsScore >= 80 ? "text-green-600 bg-green-50" :
                            candidate.atsScore >= 60 ? "text-yellow-600 bg-yellow-50" : "text-red-600 bg-red-50"
                          }`}>
                            <p className="text-xl font-bold">{candidate.atsScore}%</p>
                            <p className="text-[10px] uppercase">Match</p>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {candidate.matchedSkills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-[10px]">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.matchedSkills.length > 3 && (
                            <Badge variant="outline" className="text-[10px]">
                              +{candidate.matchedSkills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>

                {filteredCandidates.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-lg font-medium mb-1">No candidates found</p>
                    <p className="text-sm">Try adjusting your filters</p>
                  </div>
                )}
              </div>

              {/* Candidate Detail Panel */}
              {selectedCandidate && (
                <div className="w-1/3 overflow-y-auto scrollbar-hide">
                  <Card className="sticky top-0">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Candidate Profile</h3>
                      <button
                        onClick={() => setSelectedCandidate(null)}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Profile Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                        <span className="text-secondary font-bold text-2xl">
                          {selectedCandidate.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{selectedCandidate.name}</h4>
                        <p className="text-sm text-gray-500">{selectedCandidate.email}</p>
                        <Badge
                          variant={
                            selectedCandidate.status === "shortlisted" ? "success" :
                            selectedCandidate.status === "interviewed" ? "primary" :
                            selectedCandidate.status === "rejected" ? "danger" : "warning"
                          }
                          className="capitalize mt-1"
                        >
                          {selectedCandidate.status}
                        </Badge>
                      </div>
                    </div>

                    {/* ATS Score */}
                    <div className={`p-4 rounded-xl mb-4 ${
                      selectedCandidate.atsScore >= 80 ? "bg-green-50" :
                      selectedCandidate.atsScore >= 60 ? "bg-yellow-50" : "bg-red-50"
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">ATS Match Score</span>
                        <span className={`text-2xl font-bold ${
                          selectedCandidate.atsScore >= 80 ? "text-green-600" :
                          selectedCandidate.atsScore >= 60 ? "text-yellow-600" : "text-red-600"
                        }`}>
                          {selectedCandidate.atsScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className={`h-2 rounded-full ${
                            selectedCandidate.atsScore >= 80 ? "bg-green-500" :
                            selectedCandidate.atsScore >= 60 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${selectedCandidate.atsScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Applied For</p>
                        <p className="text-sm font-medium text-gray-900">{selectedCandidate.appliedFor}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Experience</p>
                        <p className="text-sm font-medium text-gray-900">{selectedCandidate.experience}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Education</p>
                        <p className="text-sm font-medium text-gray-900">{selectedCandidate.education}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Applied</p>
                        <p className="text-sm font-medium text-gray-900">{selectedCandidate.appliedAt}</p>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-6">
                      <p className="text-xs text-gray-500 uppercase mb-2">Matched Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.matchedSkills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-4 border-t border-gray-100">
                      <Button className="w-full">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Full Resume
                      </Button>
                      {selectedCandidate.status === "pending" && (
                        <>
                          <Button variant="outline" className="w-full" onClick={() => handleShortlist(selectedCandidate.id)}>
                            Shortlist Candidate
                          </Button>
                          <Button variant="ghost" className="w-full text-red-500" onClick={() => handleReject(selectedCandidate.id)}>
                            Reject Application
                          </Button>
                        </>
                      )}
                      {selectedCandidate.status === "shortlisted" && (
                        <Button variant="outline" className="w-full">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Schedule Interview
                        </Button>
                      )}
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Candidates;
