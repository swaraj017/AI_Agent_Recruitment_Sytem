import React, { useState } from "react";
import { Sidebar, Header } from "../../components/layout";
import { Card, Badge, Button, Input, Select } from "../../components/common";
import { StatsCard } from "../../components/job";

// Navigation items for User/Job Seeker - simplified (icons handled by Sidebar)
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
    tags: ["Remote", "Full-time"],
    postedAt: "2 days ago",
    type: "Full-time",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Twitch",
    location: "Wrocław",
    salary: "8.2 - 13.5k PLN",
    tags: ["Remote", "Full-time"],
    postedAt: "2 days ago",
    type: "Full-time",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Google",
    location: "Warszawa",
    salary: "7.5 - 12.5k PLN",
    tags: ["Hybrid", "Full-time"],
    postedAt: "3 days ago",
    type: "Full-time",
  },
  {
    id: 4,
    title: "Motion Designer",
    company: "Adobe",
    location: "Remote",
    salary: "7.2 - 12.5k PLN",
    tags: ["Remote", "Contract"],
    postedAt: "3 days ago",
    type: "Contract",
  },
];

// Mock applications
const mockApplications = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    company: "Meta",
    appliedAt: "Jan 28, 2026",
    status: "interview",
  },
  {
    id: 2,
    jobTitle: "UX Designer",
    company: "Spotify",
    appliedAt: "Jan 25, 2026",
    status: "review",
  },
  {
    id: 3,
    jobTitle: "Product Designer",
    company: "Figma",
    appliedAt: "Jan 20, 2026",
    status: "applied",
  },
];

// Mock upcoming interviews
const mockInterviews = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    company: "Meta",
    date: "Feb 6, 2026",
    time: "10:00 AM",
    type: "Video Call",
  },
  {
    id: 2,
    jobTitle: "UX Designer",
    company: "Spotify",
    date: "Feb 8, 2026",
    time: "2:00 PM",
    type: "On-site",
  },
];

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock user - in real app, get from context/auth
  const user = {
    fullName: "Anne Douglas",
    email: "anne@example.com",
    role: "Job Seeker",
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      applied: { variant: "default", label: "Applied" },
      review: { variant: "warning", label: "In Review" },
      interview: { variant: "info", label: "Interview" },
      offered: { variant: "success", label: "Offered" },
      rejected: { variant: "danger", label: "Rejected" },
    };
    const config = statusConfig[status] || statusConfig.applied;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

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

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <Sidebar
        navItems={navItems}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-200 ${sidebarOpen ? 'lg:ml-56' : 'lg:ml-16'}`}>
        {/* Header */}
        <Header 
          user={user} 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-foreground">
              Welcome back, {user.fullName?.split(' ')[0]}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Here's what's happening with your job search
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatsCard
              title="Applications"
              value="12"
              subtitle="3 this week"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            />
            <StatsCard
              title="In Review"
              value="4"
              subtitle="2 companies"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
            />
            <StatsCard
              title="Interviews"
              value="2"
              subtitle="This week"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            />
            <StatsCard
              title="Profile Views"
              value="48"
              subtitle="+12% this week"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Recommended Jobs */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recommended Jobs */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-foreground">Recommended Jobs</h2>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>

                <div className="space-y-3">
                  {mockJobs.map((job) => (
                    <div
                      key={job.id}
                      className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer group"
                    >
                      {/* Company Logo */}
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 ${getLogoColor(job.company)}`}>
                        {job.company?.charAt(0)}
                      </div>

                      {/* Job Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-medium text-foreground group-hover:text-brand transition-colors text-sm">
                            {job.title}
                          </h3>
                          {job.tags.slice(0, 2).map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-[10px]">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {job.company} • {job.location}
                        </p>
                      </div>

                      {/* Salary & Time */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-medium text-foreground">{job.salary}</p>
                        <p className="text-xs text-muted-foreground">{job.postedAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recent Applications */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-foreground">Recent Applications</h2>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">Position</th>
                        <th className="text-left py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">Company</th>
                        <th className="text-left py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">Applied</th>
                        <th className="text-left py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {mockApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                          <td className="py-3 text-sm font-medium text-foreground">{app.jobTitle}</td>
                          <td className="py-3 text-sm text-muted-foreground">{app.company}</td>
                          <td className="py-3 text-sm text-muted-foreground">{app.appliedAt}</td>
                          <td className="py-3">{getStatusBadge(app.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Profile Completion */}
              <Card>
                <h2 className="text-base font-semibold text-foreground mb-4">Profile Completion</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Your profile is</span>
                    <span className="font-semibold text-foreground">75% complete</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-brand rounded-full" style={{ width: '75%' }} />
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-muted-foreground">Basic info added</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-muted-foreground">Resume uploaded</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="text-muted-foreground">Add work experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="text-muted-foreground">Add skills</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Complete Profile
                  </Button>
                </div>
              </Card>

              {/* Upcoming Interviews */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-foreground">Upcoming Interviews</h2>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>

                <div className="space-y-3">
                  {mockInterviews.map((interview) => (
                    <div
                      key={interview.id}
                      className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-foreground text-sm">{interview.jobTitle}</h3>
                          <p className="text-xs text-muted-foreground">{interview.company}</p>
                        </div>
                        <Badge variant="info" className="text-[10px]">{interview.type}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {interview.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {interview.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {mockInterviews.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-sm text-muted-foreground">No upcoming interviews</p>
                  </div>
                )}
              </Card>

              {/* Quick Actions */}
              <Card>
                <h2 className="text-base font-semibold text-foreground mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Browse Jobs
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Upload Resume
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    Saved Jobs
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
