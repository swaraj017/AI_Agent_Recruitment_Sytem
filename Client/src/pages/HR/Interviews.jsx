import React, { useState } from "react";
import { Sidebar, Header } from "../../components/layout";
import { Card, Badge, Button, Input } from "../../components/common";

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

// Mock interview data
const mockInterviews = [
  {
    id: 1,
    candidateName: "John Smith",
    candidateEmail: "john.smith@email.com",
    jobTitle: "Senior Frontend Developer",
    date: "Feb 5, 2026",
    time: "10:00 AM",
    duration: "45 mins",
    type: "AI Interview",
    status: "scheduled",
    atsScore: 92,
  },
  {
    id: 2,
    candidateName: "Anna Martinez",
    candidateEmail: "anna.m@email.com",
    jobTitle: "UX Designer",
    date: "Feb 5, 2026",
    time: "2:00 PM",
    duration: "45 mins",
    type: "AI Interview",
    status: "scheduled",
    atsScore: 95,
  },
  {
    id: 3,
    candidateName: "Emily Johnson",
    candidateEmail: "emily.j@email.com",
    jobTitle: "Senior Frontend Developer",
    date: "Feb 3, 2026",
    time: "11:00 AM",
    duration: "45 mins",
    type: "AI Interview",
    status: "completed",
    atsScore: 88,
    interviewScore: 78,
  },
  {
    id: 4,
    candidateName: "Ryan O'Connor",
    candidateEmail: "ryan.o@email.com",
    jobTitle: "Backend Developer",
    date: "Feb 2, 2026",
    time: "3:00 PM",
    duration: "45 mins",
    type: "AI Interview",
    status: "completed",
    atsScore: 91,
    interviewScore: 85,
  },
  {
    id: 5,
    candidateName: "Michael Brown",
    candidateEmail: "m.brown@email.com",
    jobTitle: "Senior Frontend Developer",
    date: "Feb 6, 2026",
    time: "9:00 AM",
    duration: "45 mins",
    type: "AI Interview",
    status: "pending",
    atsScore: 85,
  },
  {
    id: 6,
    candidateName: "Chris Taylor",
    candidateEmail: "chris.t@email.com",
    jobTitle: "UX Designer",
    date: "Feb 7, 2026",
    time: "11:00 AM",
    duration: "45 mins",
    type: "AI Interview",
    status: "pending",
    atsScore: 82,
  },
];

// Calendar days for February 2026
const calendarDays = [
  { day: 1, interviews: 0 },
  { day: 2, interviews: 1 },
  { day: 3, interviews: 1 },
  { day: 4, interviews: 0 },
  { day: 5, interviews: 2 },
  { day: 6, interviews: 1 },
  { day: 7, interviews: 1 },
];

const Interviews = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedDate, setSelectedDate] = useState(5);
  const [selectedInterview, setSelectedInterview] = useState(null);

  const user = {
    fullName: "HR Manager",
    email: "hr@company.com",
    role: "HR",
  };

  const upcomingInterviews = mockInterviews.filter((i) => i.status === "scheduled" || i.status === "pending");
  const completedInterviews = mockInterviews.filter((i) => i.status === "completed");
  const displayedInterviews = activeTab === "upcoming" ? upcomingInterviews : completedInterviews;

  const todayInterviews = mockInterviews.filter((i) => i.date === "Feb 5, 2026");

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled": return "bg-blue-50 text-blue-600";
      case "completed": return "bg-green-50 text-green-600";
      case "pending": return "bg-yellow-50 text-yellow-600";
      case "cancelled": return "bg-red-50 text-red-600";
      default: return "bg-gray-50 text-gray-600";
    }
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
                <h1 className="text-2xl font-bold text-gray-900">Interviews</h1>
                <p className="text-gray-500 text-sm">Manage AI interviews and view results</p>
              </div>
              <Button>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Schedule Interview
              </Button>
            </div>

            {/* Main Grid */}
            <div className="flex-1 grid grid-cols-3 gap-6 min-h-0">
              {/* Calendar & Today's Interviews */}
              <div className="col-span-1 flex flex-col gap-4 overflow-y-auto scrollbar-hide">
                {/* Mini Calendar */}
                <Card>
                  <h3 className="font-semibold text-gray-900 mb-4">February 2026</h3>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                      <div key={i} className="text-xs text-gray-400 py-1">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {/* Empty cells for days before Feb 1 (Feb 2026 starts on Sunday) */}
                    {calendarDays.map((item) => (
                      <button
                        key={item.day}
                        onClick={() => setSelectedDate(item.day)}
                        className={`aspect-square rounded-lg text-sm flex flex-col items-center justify-center relative transition-all ${
                          selectedDate === item.day
                            ? "bg-secondary text-white"
                            : item.day === 3
                            ? "bg-secondary/10 text-secondary font-semibold"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.day}
                        {item.interviews > 0 && (
                          <span className={`absolute bottom-1 w-1 h-1 rounded-full ${
                            selectedDate === item.day ? "bg-white" : "bg-secondary"
                          }`} />
                        )}
                      </button>
                    ))}
                    {/* More days would go here */}
                    {Array.from({ length: 21 }, (_, i) => i + 8).map((day) => (
                      <button
                        key={day}
                        className="aspect-square rounded-lg text-sm flex items-center justify-center hover:bg-gray-100 text-gray-700"
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Today's Schedule */}
                <Card>
                  <h3 className="font-semibold text-gray-900 mb-4">Today's Schedule</h3>
                  {todayInterviews.length > 0 ? (
                    <div className="space-y-3">
                      {todayInterviews.map((interview) => (
                        <div
                          key={interview.id}
                          className="p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => setSelectedInterview(interview)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-secondary">{interview.time}</span>
                            <Badge className={`${getStatusColor(interview.status)} text-[10px]`}>
                              {interview.status}
                            </Badge>
                          </div>
                          <p className="font-medium text-gray-900 text-sm">{interview.candidateName}</p>
                          <p className="text-xs text-gray-500">{interview.jobTitle}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 text-center py-4">No interviews scheduled for today</p>
                  )}
                </Card>

                {/* Quick Stats */}
                <Card>
                  <h3 className="font-semibold text-gray-900 mb-4">This Week</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-blue-50 rounded-xl">
                      <p className="text-2xl font-bold text-blue-600">{upcomingInterviews.length}</p>
                      <p className="text-xs text-gray-500">Upcoming</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-xl">
                      <p className="text-2xl font-bold text-green-600">{completedInterviews.length}</p>
                      <p className="text-xs text-gray-500">Completed</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Interview List */}
              <div className="col-span-2 flex flex-col min-h-0">
                {/* Tabs */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setActiveTab("upcoming")}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        activeTab === "upcoming"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Upcoming ({upcomingInterviews.length})
                    </button>
                    <button
                      onClick={() => setActiveTab("completed")}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        activeTab === "completed"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Completed ({completedInterviews.length})
                    </button>
                  </div>
                </div>

                {/* Interview Cards */}
                <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
                  {displayedInterviews.map((interview) => (
                    <Card
                      key={interview.id}
                      className={`cursor-pointer transition-all ${
                        selectedInterview?.id === interview.id
                          ? "ring-2 ring-secondary"
                          : "hover:shadow-md"
                      }`}
                      onClick={() => setSelectedInterview(interview)}
                    >
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-secondary font-semibold text-lg">
                            {interview.candidateName.charAt(0)}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{interview.candidateName}</h4>
                            <Badge className={`${getStatusColor(interview.status)} text-[10px] capitalize`}>
                              {interview.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">{interview.jobTitle}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {interview.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {interview.time}
                            </span>
                            <span>{interview.duration}</span>
                          </div>
                        </div>

                        {/* Scores */}
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className={`text-lg font-bold ${
                              interview.atsScore >= 80 ? "text-green-600" : "text-yellow-600"
                            }`}>
                              {interview.atsScore}%
                            </p>
                            <p className="text-[10px] text-gray-400 uppercase">ATS</p>
                          </div>
                          {interview.interviewScore && (
                            <div className="text-center">
                              <p className={`text-lg font-bold ${
                                interview.interviewScore >= 80 ? "text-green-600" : "text-yellow-600"
                              }`}>
                                {interview.interviewScore}%
                              </p>
                              <p className="text-[10px] text-gray-400 uppercase">Interview</p>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          {interview.status === "completed" ? (
                            <Button size="sm" variant="outline">View Results</Button>
                          ) : interview.status === "scheduled" ? (
                            <Button size="sm">Send Reminder</Button>
                          ) : (
                            <Button size="sm" variant="outline">Confirm</Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}

                  {displayedInterviews.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                      <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-lg font-medium mb-1">No interviews</p>
                      <p className="text-sm">
                        {activeTab === "upcoming" ? "No upcoming interviews scheduled" : "No completed interviews yet"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Interview Detail Modal */}
            {selectedInterview && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedInterview(null)}>
                <Card className="w-full max-w-lg m-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Interview Details</h3>
                    <button
                      onClick={() => setSelectedInterview(null)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Candidate Info */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                      <span className="text-secondary font-bold text-2xl">
                        {selectedInterview.candidateName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{selectedInterview.candidateName}</h4>
                      <p className="text-sm text-gray-500">{selectedInterview.candidateEmail}</p>
                      <Badge className={`${getStatusColor(selectedInterview.status)} capitalize mt-1`}>
                        {selectedInterview.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">Position</p>
                      <p className="font-medium text-gray-900">{selectedInterview.jobTitle}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">Type</p>
                      <p className="font-medium text-gray-900">{selectedInterview.type}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">Date & Time</p>
                      <p className="font-medium text-gray-900">{selectedInterview.date} at {selectedInterview.time}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">Duration</p>
                      <p className="font-medium text-gray-900">{selectedInterview.duration}</p>
                    </div>
                  </div>

                  {/* Scores */}
                  <div className="flex gap-4 mb-6">
                    <div className={`flex-1 p-4 rounded-xl ${
                      selectedInterview.atsScore >= 80 ? "bg-green-50" : "bg-yellow-50"
                    }`}>
                      <p className="text-xs text-gray-500 mb-1">ATS Score</p>
                      <p className={`text-2xl font-bold ${
                        selectedInterview.atsScore >= 80 ? "text-green-600" : "text-yellow-600"
                      }`}>
                        {selectedInterview.atsScore}%
                      </p>
                    </div>
                    {selectedInterview.interviewScore && (
                      <div className={`flex-1 p-4 rounded-xl ${
                        selectedInterview.interviewScore >= 80 ? "bg-green-50" : "bg-yellow-50"
                      }`}>
                        <p className="text-xs text-gray-500 mb-1">Interview Score</p>
                        <p className={`text-2xl font-bold ${
                          selectedInterview.interviewScore >= 80 ? "text-green-600" : "text-yellow-600"
                        }`}>
                          {selectedInterview.interviewScore}%
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    {selectedInterview.status === "completed" ? (
                      <>
                        <Button className="flex-1">View Full Report</Button>
                        <Button variant="outline" className="flex-1">Download PDF</Button>
                      </>
                    ) : (
                      <>
                        <Button className="flex-1">Send Reminder</Button>
                        <Button variant="outline" className="flex-1">Reschedule</Button>
                        <Button variant="ghost" className="text-red-500">Cancel</Button>
                      </>
                    )}
                  </div>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Interviews;
