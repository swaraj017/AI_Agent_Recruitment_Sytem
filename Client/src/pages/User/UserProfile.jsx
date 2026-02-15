import React, { useState } from "react";
import { Sidebar, Header } from "../../components/layout";
import { Card, Badge, Button, Input } from "../../components/common";

const navItems = [
  { path: "/user/dashboard", label: "Dashboard" },
  { path: "/user/jobs", label: "Job Board" },
  { path: "/user/applications", label: "My Applications" },
  { path: "/user/interviews", label: "Interviews" },
  { path: "/user/profile", label: "My Profile" },
  { path: "/user/settings", label: "Settings" },
];

const UserProfile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState({
    fullName: "Anne Douglas",
    email: "anne@example.com",
    phone: "+48 123 456 789",
    location: "Warszawa, Poland",
    title: "UX Designer",
    bio: "Passionate UX Designer with 5+ years of experience creating intuitive digital experiences. Skilled in user research, wireframing, and prototyping.",
    linkedin: "linkedin.com/in/annedouglas",
    portfolio: "annedouglas.design",
    github: "github.com/annedouglas",
    skills: ["Figma", "Sketch", "User Research", "Prototyping", "UI Design", "Wireframing", "Design Systems", "Adobe XD"],
    experience: [
      {
        id: 1,
        title: "Senior UX Designer",
        company: "TechCorp",
        location: "Warszawa",
        startDate: "Jan 2023",
        endDate: "Present",
        description: "Leading design initiatives for enterprise software products.",
      },
      {
        id: 2,
        title: "UX Designer",
        company: "StartupXYZ",
        location: "Remote",
        startDate: "Mar 2020",
        endDate: "Dec 2022",
        description: "Designed mobile and web applications from concept to launch.",
      },
    ],
    education: [
      {
        id: 1,
        degree: "Master of Science in Human-Computer Interaction",
        school: "University of Warsaw",
        year: "2020",
      },
      {
        id: 2,
        degree: "Bachelor of Arts in Graphic Design",
        school: "Academy of Fine Arts",
        year: "2018",
      },
    ],
  });

  const [resumeFile, setResumeFile] = useState(null);

  const user = {
    fullName: profile.fullName,
    email: profile.email,
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // API call to save profile
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold text-foreground">My Profile</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your personal information and resume
              </p>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>

          {/* Profile Completion */}
          <Card className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">
                Profile Completion
              </span>
              <span className="text-sm font-semibold text-brand">75%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-brand rounded-full transition-all"
                style={{ width: "75%" }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Complete your profile to increase visibility to recruiters
            </p>
          </Card>

          {/* Tabs */}
          <div className="flex items-center gap-2 mb-6 border-b border-border">
            {[
              { value: "profile", label: "Profile" },
              { value: "resume", label: "Resume" },
              { value: "experience", label: "Experience" },
              { value: "education", label: "Education" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  activeTab === tab.value
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <h2 className="text-base font-semibold text-foreground mb-4">
                    Basic Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Full Name
                      </label>
                      {isEditing ? (
                        <Input
                          value={profile.fullName}
                          onChange={(e) =>
                            setProfile({ ...profile, fullName: e.target.value })
                          }
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          {profile.fullName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Email
                      </label>
                      <p className="text-sm text-muted-foreground">
                        {profile.email}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Phone
                      </label>
                      {isEditing ? (
                        <Input
                          value={profile.phone}
                          onChange={(e) =>
                            setProfile({ ...profile, phone: e.target.value })
                          }
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          {profile.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Location
                      </label>
                      {isEditing ? (
                        <Input
                          value={profile.location}
                          onChange={(e) =>
                            setProfile({ ...profile, location: e.target.value })
                          }
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          {profile.location}
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Professional Title
                      </label>
                      {isEditing ? (
                        <Input
                          value={profile.title}
                          onChange={(e) =>
                            setProfile({ ...profile, title: e.target.value })
                          }
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          {profile.title}
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Bio
                      </label>
                      {isEditing ? (
                        <textarea
                          rows={3}
                          value={profile.bio}
                          onChange={(e) =>
                            setProfile({ ...profile, bio: e.target.value })
                          }
                          className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand resize-none"
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          {profile.bio}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Links */}
                <Card>
                  <h2 className="text-base font-semibold text-foreground mb-4">
                    Links
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        LinkedIn
                      </label>
                      {isEditing ? (
                        <Input
                          value={profile.linkedin}
                          onChange={(e) =>
                            setProfile({ ...profile, linkedin: e.target.value })
                          }
                        />
                      ) : (
                        <a
                          href={`https://${profile.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-brand hover:underline"
                        >
                          {profile.linkedin}
                        </a>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Portfolio
                      </label>
                      {isEditing ? (
                        <Input
                          value={profile.portfolio}
                          onChange={(e) =>
                            setProfile({ ...profile, portfolio: e.target.value })
                          }
                        />
                      ) : (
                        <a
                          href={`https://${profile.portfolio}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-brand hover:underline"
                        >
                          {profile.portfolio}
                        </a>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        GitHub
                      </label>
                      {isEditing ? (
                        <Input
                          value={profile.github}
                          onChange={(e) =>
                            setProfile({ ...profile, github: e.target.value })
                          }
                        />
                      ) : (
                        <a
                          href={`https://${profile.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-brand hover:underline"
                        >
                          {profile.github}
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Profile Photo */}
                <Card className="text-center">
                  <div className="w-24 h-24 rounded-full bg-foreground text-background flex items-center justify-center mx-auto text-3xl font-bold mb-4">
                    {profile.fullName.charAt(0)}
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {profile.fullName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{profile.title}</p>
                  {isEditing && (
                    <Button variant="outline" size="sm" className="mt-3">
                      Change Photo
                    </Button>
                  )}
                </Card>

                {/* Skills */}
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold text-foreground">
                      Skills
                    </h2>
                    {isEditing && (
                      <Button variant="ghost" size="sm">
                        + Add
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline">
                        {skill}
                        {isEditing && (
                          <button className="ml-1 text-muted-foreground hover:text-foreground">
                            ×
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Resume Tab */}
          {activeTab === "resume" && (
            <Card>
              <h2 className="text-base font-semibold text-foreground mb-4">
                Resume / CV
              </h2>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                />
                {resumeFile ? (
                  <div>
                    <svg
                      className="w-12 h-12 text-brand mx-auto mb-4"
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
                    <p className="font-medium text-foreground mb-1">
                      {resumeFile.name}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Uploaded just now
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <label htmlFor="resume-upload">
                        <Button variant="outline" size="sm" as="span">
                          Replace
                        </Button>
                      </label>
                    </div>
                  </div>
                ) : (
                  <label htmlFor="resume-upload" className="cursor-pointer">
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
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <p className="text-muted-foreground mb-2">
                      <span className="text-brand font-medium">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, DOC, DOCX (max 5MB)
                    </p>
                  </label>
                )}
              </div>
            </Card>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-foreground">
                  Work Experience
                </h2>
                <Button variant="outline" size="sm">
                  + Add Experience
                </Button>
              </div>
              {profile.experience.map((exp) => (
                <Card key={exp.id}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">{exp.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {exp.company} • {exp.location}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {exp.startDate} - {exp.endDate}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {exp.description}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-foreground">
                  Education
                </h2>
                <Button variant="outline" size="sm">
                  + Add Education
                </Button>
              </div>
              {profile.education.map((edu) => (
                <Card key={edu.id}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">
                        {edu.school}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {edu.year}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
