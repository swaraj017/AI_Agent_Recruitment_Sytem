import React, { useState } from "react";
import { Sidebar, Header } from "../../components/layout";
import { Card, Button, Input } from "../../components/common";

const navItems = [
  { path: "/user/dashboard", label: "Dashboard" },
  { path: "/user/jobs", label: "Job Board" },
  { path: "/user/applications", label: "My Applications" },
  { path: "/user/interviews", label: "Interviews" },
  { path: "/user/profile", label: "My Profile" },
  { path: "/user/settings", label: "Settings" },
];

const UserSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("account");

  const [notifications, setNotifications] = useState({
    emailNewJobs: true,
    emailApplicationUpdates: true,
    emailInterviewReminders: true,
    emailWeeklyDigest: false,
    pushNewJobs: true,
    pushApplicationUpdates: true,
    pushInterviewReminders: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true,
  });

  const user = {
    fullName: "Anne Douglas",
    email: "anne@example.com",
  };

  const handleNotificationChange = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handlePrivacyChange = (key) => {
    setPrivacy({ ...privacy, [key]: !privacy[key] });
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
            <h1 className="text-xl font-semibold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="p-2">
                <nav className="space-y-1">
                  {[
                    { value: "account", label: "Account", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
                    { value: "notifications", label: "Notifications", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
                    { value: "privacy", label: "Privacy", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
                    { value: "security", label: "Security", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setActiveTab(item.value)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === item.value
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d={item.icon}
                        />
                      </svg>
                      {item.label}
                    </button>
                  ))}
                </nav>
              </Card>
            </div>

            {/* Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Account Settings */}
              {activeTab === "account" && (
                <>
                  <Card>
                    <h2 className="text-base font-semibold text-foreground mb-4">
                      Account Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                          Full Name
                        </label>
                        <Input defaultValue="Anne Douglas" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                          Email Address
                        </label>
                        <Input defaultValue="anne@example.com" type="email" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                          Phone Number
                        </label>
                        <Input defaultValue="+48 123 456 789" type="tel" />
                      </div>
                      <Button>Save Changes</Button>
                    </div>
                  </Card>

                  <Card>
                    <h2 className="text-base font-semibold text-foreground mb-4">
                      Danger Zone
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Once you delete your account, there is no going back. Please
                      be certain.
                    </p>
                    <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                      Delete Account
                    </Button>
                  </Card>
                </>
              )}

              {/* Notifications Settings */}
              {activeTab === "notifications" && (
                <>
                  <Card>
                    <h2 className="text-base font-semibold text-foreground mb-4">
                      Email Notifications
                    </h2>
                    <div className="space-y-4">
                      {[
                        { key: "emailNewJobs", label: "New job matches", description: "Get notified when new jobs match your profile" },
                        { key: "emailApplicationUpdates", label: "Application updates", description: "Updates on your job applications" },
                        { key: "emailInterviewReminders", label: "Interview reminders", description: "Reminders before scheduled interviews" },
                        { key: "emailWeeklyDigest", label: "Weekly digest", description: "Weekly summary of job market trends" },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {item.label}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                          <button
                            onClick={() => handleNotificationChange(item.key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notifications[item.key] ? "bg-brand" : "bg-muted"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notifications[item.key]
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card>
                    <h2 className="text-base font-semibold text-foreground mb-4">
                      Push Notifications
                    </h2>
                    <div className="space-y-4">
                      {[
                        { key: "pushNewJobs", label: "New job alerts" },
                        { key: "pushApplicationUpdates", label: "Application status changes" },
                        { key: "pushInterviewReminders", label: "Interview reminders" },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between"
                        >
                          <p className="text-sm font-medium text-foreground">
                            {item.label}
                          </p>
                          <button
                            onClick={() => handleNotificationChange(item.key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notifications[item.key] ? "bg-brand" : "bg-muted"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notifications[item.key]
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </Card>
                </>
              )}

              {/* Privacy Settings */}
              {activeTab === "privacy" && (
                <Card>
                  <h2 className="text-base font-semibold text-foreground mb-4">
                    Privacy Settings
                  </h2>
                  <div className="space-y-4">
                    {[
                      { key: "profileVisible", label: "Make profile visible to recruiters", description: "Allow recruiters to find and view your profile" },
                      { key: "showEmail", label: "Show email address", description: "Display your email on your public profile" },
                      { key: "showPhone", label: "Show phone number", description: "Display your phone number on your public profile" },
                      { key: "allowMessages", label: "Allow direct messages", description: "Let recruiters send you messages" },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {item.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <button
                          onClick={() => handlePrivacyChange(item.key)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            privacy[item.key] ? "bg-brand" : "bg-muted"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              privacy[item.key]
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <>
                  <Card>
                    <h2 className="text-base font-semibold text-foreground mb-4">
                      Change Password
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                          Current Password
                        </label>
                        <Input type="password" placeholder="••••••••" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                          New Password
                        </label>
                        <Input type="password" placeholder="••••••••" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                          Confirm New Password
                        </label>
                        <Input type="password" placeholder="••••••••" />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </Card>

                  <Card>
                    <h2 className="text-base font-semibold text-foreground mb-4">
                      Two-Factor Authentication
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add an extra layer of security to your account by enabling
                      two-factor authentication.
                    </p>
                    <Button variant="outline">Enable 2FA</Button>
                  </Card>

                  <Card>
                    <h2 className="text-base font-semibold text-foreground mb-4">
                      Active Sessions
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                        <div className="flex items-center gap-3">
                          <svg
                            className="w-5 h-5 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              Windows PC - Chrome
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Warszawa, Poland • Current session
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-green-500">Active</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-4">
                      Sign out all other sessions
                    </Button>
                  </Card>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserSettings;
