import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Header } from "../../components/layout";
import { Card, Badge, Button } from "../../components/common";

const navItems = [
  { path: "/user/dashboard", label: "Dashboard" },
  { path: "/user/jobs", label: "Job Board" },
  { path: "/user/applications", label: "My Applications" },
  { path: "/user/interviews", label: "Interviews" },
  { path: "/user/profile", label: "My Profile" },
  { path: "/user/settings", label: "Settings" },
];

// Mock applications data
const mockApplications = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    company: "Meta",
    location: "London",
    salary: "18.0 - 25.5k PLN",
    appliedAt: "Jan 28, 2026",
    status: "interview",
    stage: "Technical Interview",
    nextStep: "Feb 6, 2026 at 10:00 AM",
  },
  {
    id: 2,
    jobTitle: "UX Designer",
    company: "Spotify",
    location: "Stockholm",
    salary: "14.0 - 20.0k PLN",
    appliedAt: "Jan 25, 2026",
    status: "review",
    stage: "Portfolio Review",
    nextStep: "Waiting for feedback",
  },
  {
    id: 3,
    jobTitle: "Product Designer",
    company: "Figma",
    location: "San Francisco",
    salary: "15.0 - 22.0k PLN",
    appliedAt: "Jan 20, 2026",
    status: "applied",
    stage: "Application Submitted",
    nextStep: "Under review",
  },
  {
    id: 4,
    jobTitle: "Backend Developer",
    company: "Google",
    location: "Warszawa",
    salary: "15.5 - 22.5k PLN",
    appliedAt: "Jan 15, 2026",
    status: "offered",
    stage: "Offer Received",
    nextStep: "Respond by Feb 10, 2026",
  },
  {
    id: 5,
    jobTitle: "Motion Designer",
    company: "Adobe",
    location: "Remote",
    salary: "7.2 - 12.5k PLN",
    appliedAt: "Jan 10, 2026",
    status: "rejected",
    stage: "Application Closed",
    nextStep: "Position filled",
  },
];

const MyApplications = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filter, setFilter] = useState("all");

  const user = {
    fullName: "Anne Douglas",
    email: "anne@example.com",
  };

  const statusConfig = {
    applied: { variant: "default", label: "Applied", color: "bg-gray-500" },
    review: { variant: "warning", label: "In Review", color: "bg-yellow-500" },
    interview: { variant: "info", label: "Interview", color: "bg-blue-500" },
    offered: { variant: "success", label: "Offered", color: "bg-green-500" },
    rejected: { variant: "danger", label: "Rejected", color: "bg-red-500" },
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

  const filteredApplications =
    filter === "all"
      ? mockApplications
      : mockApplications.filter((app) => app.status === filter);

  const stats = {
    total: mockApplications.length,
    active: mockApplications.filter((a) =>
      ["applied", "review", "interview"].includes(a.status)
    ).length,
    interviews: mockApplications.filter((a) => a.status === "interview").length,
    offers: mockApplications.filter((a) => a.status === "offered").length,
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
            <h1 className="text-xl font-semibold text-foreground">
              My Applications
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track and manage your job applications
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <Card className="text-center">
              <p className="text-2xl font-semibold text-foreground">
                {stats.total}
              </p>
              <p className="text-xs text-muted-foreground">Total Applied</p>
            </Card>
            <Card className="text-center">
              <p className="text-2xl font-semibold text-foreground">
                {stats.active}
              </p>
              <p className="text-xs text-muted-foreground">Active</p>
            </Card>
            <Card className="text-center">
              <p className="text-2xl font-semibold text-blue-500">
                {stats.interviews}
              </p>
              <p className="text-xs text-muted-foreground">Interviews</p>
            </Card>
            <Card className="text-center">
              <p className="text-2xl font-semibold text-green-500">
                {stats.offers}
              </p>
              <p className="text-xs text-muted-foreground">Offers</p>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { value: "all", label: "All" },
              { value: "applied", label: "Applied" },
              { value: "review", label: "In Review" },
              { value: "interview", label: "Interview" },
              { value: "offered", label: "Offered" },
              { value: "rejected", label: "Rejected" },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                  filter === item.value
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <Card key={app.id} hover className="cursor-pointer">
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0 ${getLogoColor(
                      app.company
                    )}`}
                  >
                    {app.company?.charAt(0)}
                  </div>

                  {/* Application Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-foreground">
                          {app.jobTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {app.company} • {app.location}
                        </p>
                      </div>
                      <Badge variant={statusConfig[app.status].variant}>
                        {statusConfig[app.status].label}
                      </Badge>
                    </div>

                    {/* Progress */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-muted-foreground">
                          {app.stage}
                        </span>
                        <span className="text-muted-foreground">
                          Applied {app.appliedAt}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            statusConfig[app.status].color
                          }`}
                          style={{
                            width:
                              app.status === "applied"
                                ? "20%"
                                : app.status === "review"
                                ? "40%"
                                : app.status === "interview"
                                ? "60%"
                                : app.status === "offered"
                                ? "100%"
                                : "100%",
                          }}
                        />
                      </div>
                    </div>

                    {/* Next Step */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 text-sm">
                        <svg
                          className="w-4 h-4 text-muted-foreground"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-muted-foreground">
                          {app.nextStep}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredApplications.length === 0 && (
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="font-medium text-foreground mb-1">
                No applications found
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {filter === "all"
                  ? "Start applying to jobs to see them here"
                  : "No applications with this status"}
              </p>
              <Button onClick={() => navigate("/user/jobs")}>Browse Jobs</Button>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyApplications;
