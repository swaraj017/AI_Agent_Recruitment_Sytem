import React, { useState } from "react";
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

// Mock interviews data
const mockInterviews = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    company: "Meta",
    date: "Feb 6, 2026",
    time: "10:00 AM",
    duration: "1 hour",
    type: "Video Call",
    platform: "Google Meet",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    interviewers: ["Sarah Johnson (Engineering Manager)", "Mike Chen (Senior Developer)"],
    stage: "Technical Interview",
    status: "upcoming",
    notes: "Be prepared to discuss React patterns and system design.",
  },
  {
    id: 2,
    jobTitle: "UX Designer",
    company: "Spotify",
    date: "Feb 8, 2026",
    time: "2:00 PM",
    duration: "45 minutes",
    type: "On-site",
    location: "Spotify Office, Stockholm",
    interviewers: ["Anna Berg (Design Lead)"],
    stage: "Portfolio Review",
    status: "upcoming",
    notes: "Bring your portfolio and be ready to discuss your design process.",
  },
  {
    id: 3,
    jobTitle: "Backend Developer",
    company: "Google",
    date: "Jan 30, 2026",
    time: "11:00 AM",
    duration: "1 hour",
    type: "Video Call",
    platform: "Google Meet",
    interviewers: ["John Smith (Tech Lead)"],
    stage: "Technical Interview",
    status: "completed",
    feedback: "Strong technical skills. Moving to final round.",
  },
  {
    id: 4,
    jobTitle: "Product Designer",
    company: "Figma",
    date: "Jan 25, 2026",
    time: "3:00 PM",
    duration: "30 minutes",
    type: "Phone Call",
    interviewers: ["HR Team"],
    stage: "HR Screening",
    status: "completed",
    feedback: "Good communication. Scheduled next interview.",
  },
];

const UserInterviews = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");

  const user = {
    fullName: "Anne Douglas",
    email: "anne@example.com",
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

  const upcomingInterviews = mockInterviews.filter(
    (i) => i.status === "upcoming"
  );
  const completedInterviews = mockInterviews.filter(
    (i) => i.status === "completed"
  );

  const displayedInterviews =
    activeTab === "upcoming" ? upcomingInterviews : completedInterviews;

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
            <h1 className="text-xl font-semibold text-foreground">Interviews</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your upcoming and past interviews
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <Card className="text-center">
              <p className="text-2xl font-semibold text-blue-500">
                {upcomingInterviews.length}
              </p>
              <p className="text-xs text-muted-foreground">Upcoming</p>
            </Card>
            <Card className="text-center">
              <p className="text-2xl font-semibold text-green-500">
                {completedInterviews.length}
              </p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </Card>
            <Card className="text-center sm:col-span-1 col-span-2">
              <p className="text-2xl font-semibold text-foreground">
                {mockInterviews.length}
              </p>
              <p className="text-xs text-muted-foreground">Total</p>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "upcoming"
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Upcoming ({upcomingInterviews.length})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "completed"
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Completed ({completedInterviews.length})
            </button>
          </div>

          {/* Interviews List */}
          <div className="space-y-4">
            {displayedInterviews.map((interview) => (
              <Card key={interview.id}>
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0 ${getLogoColor(
                      interview.company
                    )}`}
                  >
                    {interview.company?.charAt(0)}
                  </div>

                  {/* Interview Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="font-medium text-foreground">
                          {interview.jobTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {interview.company} • {interview.stage}
                        </p>
                      </div>
                      <Badge
                        variant={
                          interview.status === "upcoming" ? "info" : "success"
                        }
                      >
                        {interview.status === "upcoming"
                          ? "Upcoming"
                          : "Completed"}
                      </Badge>
                    </div>

                    {/* Date, Time, Type */}
                    <div className="flex items-center gap-4 mt-3 flex-wrap text-sm">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <svg
                          className="w-4 h-4"
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
                        {interview.date}
                      </span>
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <svg
                          className="w-4 h-4"
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
                        {interview.time} ({interview.duration})
                      </span>
                      <Badge variant="outline">{interview.type}</Badge>
                    </div>

                    {/* Platform/Location */}
                    {interview.platform && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Platform: {interview.platform}
                      </p>
                    )}
                    {interview.location && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Location: {interview.location}
                      </p>
                    )}

                    {/* Interviewers */}
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-1">
                        Interviewer(s):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {interview.interviewers.map((interviewer, idx) => (
                          <span
                            key={idx}
                            className="text-sm text-foreground bg-muted px-2 py-1 rounded"
                          >
                            {interviewer}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Notes / Feedback */}
                    {interview.notes && interview.status === "upcoming" && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-md">
                        <p className="text-xs text-muted-foreground mb-1">
                          Notes:
                        </p>
                        <p className="text-sm text-foreground">
                          {interview.notes}
                        </p>
                      </div>
                    )}
                    {interview.feedback && interview.status === "completed" && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-xs text-green-600 mb-1">Feedback:</p>
                        <p className="text-sm text-green-700">
                          {interview.feedback}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    {interview.status === "upcoming" && (
                      <div className="flex items-center gap-3 mt-4">
                        {interview.meetingLink && (
                          <Button
                            size="sm"
                            onClick={() =>
                              window.open(interview.meetingLink, "_blank")
                            }
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            Join Meeting
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Add to Calendar
                        </Button>
                        <Button variant="ghost" size="sm">
                          Reschedule
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {displayedInterviews.length === 0 && (
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="font-medium text-foreground mb-1">
                No {activeTab} interviews
              </h3>
              <p className="text-sm text-muted-foreground">
                {activeTab === "upcoming"
                  ? "You don't have any upcoming interviews scheduled"
                  : "You haven't completed any interviews yet"}
              </p>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserInterviews;
