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

const Settings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [profileData, setProfileData] = useState({
    fullName: "HR Manager",
    email: "hr@company.com",
    phone: "+48 123 456 789",
    company: "TechCorp",
    position: "Senior HR Manager",
    location: "Warsaw, Poland",
  });

  const [companyData, setCompanyData] = useState({
    name: "TechCorp",
    website: "https://techcorp.com",
    industry: "Technology",
    size: "100-500",
    description: "We are a leading technology company focused on innovation...",
    logo: null,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNewApplications: true,
    emailInterviewReminders: true,
    emailWeeklyReport: false,
    pushNewApplications: true,
    pushInterviewReminders: true,
    pushMessages: false,
  });

  const [aiSettings, setAiSettings] = useState({
    autoShortlist: true,
    shortlistThreshold: 75,
    interviewDuration: 45,
    questionCount: 10,
    adaptiveQuestions: true,
  });

  const user = {
    fullName: "HR Manager",
    email: "hr@company.com",
    role: "HR",
  };

  const sections = [
    { key: "profile", label: "Profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { key: "company", label: "Company", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { key: "notifications", label: "Notifications", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
    { key: "ai", label: "AI Settings", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { key: "security", label: "Security", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  ];

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAiChange = (key, value) => {
    setAiSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="h-screen flex bg-gray-50/50">
      <Sidebar navItems={navItems} />

      <div className="flex-1 flex flex-col ml-64">
        <Header user={user} />

        <main className="flex-1 overflow-hidden p-6">
          <div className="h-full flex gap-6">
            {/* Settings Navigation */}
            <div className="w-64 flex-shrink-0">
              <Card className="p-2">
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.key}
                      onClick={() => setActiveSection(section.key)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        activeSection === section.key
                          ? "bg-secondary text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={section.icon} />
                      </svg>
                      {section.label}
                    </button>
                  ))}
                </nav>
              </Card>
            </div>

            {/* Settings Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {/* Profile Settings */}
              {activeSection === "profile" && (
                <div className="space-y-6">
                  <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Settings</h2>
                    
                    {/* Avatar */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center">
                        <span className="text-secondary font-bold text-3xl">H</span>
                      </div>
                      <div>
                        <Button size="sm" variant="outline">Change Photo</Button>
                        <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF. Max 2MB</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <Input
                          name="fullName"
                          value={profileData.fullName}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <Input
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <Input
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                        <Input
                          name="position"
                          value={profileData.position}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <Input
                          name="location"
                          value={profileData.location}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-6 pt-6 border-t border-gray-100">
                      <Button>Save Changes</Button>
                    </div>
                  </Card>
                </div>
              )}

              {/* Company Settings */}
              {activeSection === "company" && (
                <div className="space-y-6">
                  <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Company Information</h2>

                    {/* Company Logo */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <Button size="sm" variant="outline">Upload Logo</Button>
                        <p className="text-xs text-gray-400 mt-1">PNG or SVG. Recommended 200x200px</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <Input
                          name="name"
                          value={companyData.name}
                          onChange={handleCompanyChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                        <Input
                          name="website"
                          value={companyData.website}
                          onChange={handleCompanyChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                        <select
                          name="industry"
                          value={companyData.industry}
                          onChange={handleCompanyChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                        >
                          <option value="Technology">Technology</option>
                          <option value="Finance">Finance</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Education">Education</option>
                          <option value="Retail">Retail</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                        <select
                          name="size"
                          value={companyData.size}
                          onChange={handleCompanyChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                        >
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-100">51-100 employees</option>
                          <option value="100-500">100-500 employees</option>
                          <option value="500+">500+ employees</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Description</label>
                        <textarea
                          name="description"
                          value={companyData.description}
                          onChange={handleCompanyChange}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-6 pt-6 border-t border-gray-100">
                      <Button>Save Changes</Button>
                    </div>
                  </Card>
                </div>
              )}

              {/* Notification Settings */}
              {activeSection === "notifications" && (
                <div className="space-y-6">
                  <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Email Notifications</h2>
                    
                    <div className="space-y-4">
                      {[
                        { key: "emailNewApplications", label: "New Applications", desc: "Get notified when someone applies to your job" },
                        { key: "emailInterviewReminders", label: "Interview Reminders", desc: "Receive reminders before scheduled interviews" },
                        { key: "emailWeeklyReport", label: "Weekly Report", desc: "Get a weekly summary of your recruitment activity" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div>
                            <p className="font-medium text-gray-900">{item.label}</p>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => handleNotificationChange(item.key)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              notificationSettings[item.key] ? "bg-secondary" : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                notificationSettings[item.key] ? "left-7" : "left-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Push Notifications</h2>
                    
                    <div className="space-y-4">
                      {[
                        { key: "pushNewApplications", label: "New Applications", desc: "Instant push when someone applies" },
                        { key: "pushInterviewReminders", label: "Interview Reminders", desc: "Push notification before interviews" },
                        { key: "pushMessages", label: "Messages", desc: "Get notified of new messages" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div>
                            <p className="font-medium text-gray-900">{item.label}</p>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => handleNotificationChange(item.key)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              notificationSettings[item.key] ? "bg-secondary" : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                notificationSettings[item.key] ? "left-7" : "left-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {/* AI Settings */}
              {activeSection === "ai" && (
                <div className="space-y-6">
                  <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">AI Screening Settings</h2>
                    <p className="text-sm text-gray-500 mb-6">Configure how AI processes and screens candidates</p>

                    <div className="space-y-6">
                      {/* Auto Shortlist */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900">Auto-Shortlist Candidates</p>
                          <p className="text-sm text-gray-500">Automatically shortlist candidates above threshold</p>
                        </div>
                        <button
                          onClick={() => handleAiChange("autoShortlist", !aiSettings.autoShortlist)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            aiSettings.autoShortlist ? "bg-secondary" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              aiSettings.autoShortlist ? "left-7" : "left-1"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Shortlist Threshold */}
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-medium text-gray-900">ATS Shortlist Threshold</p>
                            <p className="text-sm text-gray-500">Minimum ATS score to auto-shortlist</p>
                          </div>
                          <span className="text-lg font-bold text-secondary">{aiSettings.shortlistThreshold}%</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="95"
                          value={aiSettings.shortlistThreshold}
                          onChange={(e) => handleAiChange("shortlistThreshold", parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>50%</span>
                          <span>95%</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">AI Interview Settings</h2>
                    <p className="text-sm text-gray-500 mb-6">Configure AI interview parameters</p>

                    <div className="space-y-6">
                      {/* Interview Duration */}
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-medium text-gray-900">Interview Duration</p>
                            <p className="text-sm text-gray-500">Maximum duration for AI interviews</p>
                          </div>
                          <span className="text-lg font-bold text-secondary">{aiSettings.interviewDuration} mins</span>
                        </div>
                        <input
                          type="range"
                          min="15"
                          max="60"
                          step="15"
                          value={aiSettings.interviewDuration}
                          onChange={(e) => handleAiChange("interviewDuration", parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>15 mins</span>
                          <span>60 mins</span>
                        </div>
                      </div>

                      {/* Question Count */}
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-medium text-gray-900">Number of Questions</p>
                            <p className="text-sm text-gray-500">Questions per interview session</p>
                          </div>
                          <span className="text-lg font-bold text-secondary">{aiSettings.questionCount}</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="20"
                          value={aiSettings.questionCount}
                          onChange={(e) => handleAiChange("questionCount", parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>5</span>
                          <span>20</span>
                        </div>
                      </div>

                      {/* Adaptive Questions */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-900">Adaptive Questions</p>
                          <p className="text-sm text-gray-500">AI adapts questions based on candidate responses</p>
                        </div>
                        <button
                          onClick={() => handleAiChange("adaptiveQuestions", !aiSettings.adaptiveQuestions)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            aiSettings.adaptiveQuestions ? "bg-secondary" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              aiSettings.adaptiveQuestions ? "left-7" : "left-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end mt-6 pt-6 border-t border-gray-100">
                      <Button>Save AI Settings</Button>
                    </div>
                  </Card>
                </div>
              )}

              {/* Security Settings */}
              {activeSection === "security" && (
                <div className="space-y-6">
                  <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h2>
                    
                    <div className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <Input type="password" placeholder="Enter current password" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <Input type="password" placeholder="Enter new password" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <Input type="password" placeholder="Confirm new password" />
                      </div>
                    </div>

                    <div className="flex justify-start mt-6 pt-6 border-t border-gray-100">
                      <Button>Update Password</Button>
                    </div>
                  </Card>

                  <Card>
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Two-Factor Authentication</h2>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Enable 2FA</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline">Setup 2FA</Button>
                    </div>
                  </Card>

                  <Card className="border-red-200">
                    <h2 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h2>
                    <p className="text-sm text-gray-500 mb-6">Irreversible actions</p>
                    
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Delete Account</p>
                        <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="danger">Delete Account</Button>
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

export default Settings;
