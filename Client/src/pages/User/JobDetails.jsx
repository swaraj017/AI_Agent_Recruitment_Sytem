import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar, Header } from "../../components/layout";
import { Card, Badge, Button } from "../../components/common";

// Navigation items
const navItems = [
  { path: "/user/dashboard", label: "Dashboard" },
  { path: "/user/jobs", label: "Job Board" },
  { path: "/user/applications", label: "My Applications" },
  { path: "/user/interviews", label: "Interviews" },
  { path: "/user/profile", label: "My Profile" },
  { path: "/user/settings", label: "Settings" },
];

// Mock job data (same as JobBoard)
const mockJobs = [
  {
    id: 1,
    title: "UX Designer",
    company: "Dropbox",
    location: "Warszawa",
    salary: "8.8 - 13.7k PLN",
    type: "Full-time",
    workMode: "Remote",
    postedAt: "2 days ago",
    deadline: "Feb 28, 2026",
    experience: "3-5 years",
    skills: ["Figma", "Sketch", "User Research", "Prototyping", "Wireframing"],
    description: `We are looking for an experienced UX Designer to join our team and help us create amazing user experiences for millions of users worldwide.

As a UX Designer at Dropbox, you will:
• Lead the design of new features from concept to launch
• Conduct user research and usability testing
• Create wireframes, prototypes, and high-fidelity designs
• Collaborate with product managers and engineers
• Contribute to our design system and guidelines

Requirements:
• 3+ years of experience in UX design
• Strong portfolio demonstrating user-centered design process
• Proficiency in Figma and other design tools
• Experience with user research methodologies
• Excellent communication and collaboration skills`,
    benefits: [
      "Competitive salary",
      "Remote work flexibility",
      "Health insurance",
      "Learning budget",
      "Stock options",
      "Unlimited PTO",
    ],
    companyDescription:
      "Dropbox is a leading global collaboration platform that's transforming the way people work together.",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Twitch",
    location: "Wrocław",
    salary: "8.2 - 13.5k PLN",
    type: "Full-time",
    workMode: "Remote",
    postedAt: "2 days ago",
    deadline: "Mar 15, 2026",
    experience: "2-4 years",
    skills: ["UI Design", "Design Systems", "Figma", "Prototyping"],
    description: `Join our design team to create amazing streaming experiences for millions of creators and viewers.

What you'll do:
• Design intuitive interfaces for our streaming platform
• Work on mobile and web applications
• Create and maintain design system components
• Collaborate with cross-functional teams
• Participate in design critiques and reviews`,
    benefits: [
      "Competitive compensation",
      "Full remote work",
      "Gaming perks",
      "Health benefits",
      "Professional development",
    ],
    companyDescription:
      "Twitch is the world's leading live streaming platform for gamers and creators.",
  },
  {
    id: 3,
    title: "Senior Frontend Developer",
    company: "Google",
    location: "Warszawa",
    salary: "15.5 - 22.5k PLN",
    type: "Full-time",
    workMode: "Hybrid",
    postedAt: "3 days ago",
    deadline: "Mar 1, 2026",
    experience: "5+ years",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "Testing"],
    description: `Work on cutting-edge web applications at scale serving billions of users.

Responsibilities:
• Build and maintain complex web applications
• Write clean, maintainable, and well-tested code
• Mentor junior developers
• Participate in code reviews
• Contribute to technical decisions`,
    benefits: [
      "Top-tier compensation",
      "Health & wellness",
      "Learning opportunities",
      "Hybrid work model",
      "Equity grants",
    ],
    companyDescription:
      "Google is a multinational technology company specializing in Internet-related services and products.",
  },
  {
    id: 4,
    title: "Motion Designer",
    company: "Adobe",
    location: "Remote",
    salary: "7.2 - 12.5k PLN",
    type: "Contract",
    workMode: "Remote",
    postedAt: "3 days ago",
    deadline: "Feb 20, 2026",
    experience: "2-3 years",
    skills: ["After Effects", "Cinema 4D", "Illustration", "Animation"],
    description: `Create stunning motion graphics for our products and marketing campaigns.`,
    benefits: ["Competitive rates", "Flexible schedule", "Creative freedom"],
    companyDescription:
      "Adobe is the global leader in digital media and digital marketing solutions.",
  },
  {
    id: 5,
    title: "Backend Developer",
    company: "Meta",
    location: "London",
    salary: "18.0 - 25.5k PLN",
    type: "Full-time",
    workMode: "On-site",
    postedAt: "1 day ago",
    deadline: "Mar 10, 2026",
    experience: "4-6 years",
    skills: ["Python", "Java", "Distributed Systems", "AWS", "Databases"],
    description: `Build scalable backend systems for billions of users across our family of apps.`,
    benefits: [
      "Exceptional compensation",
      "Relocation support",
      "Health insurance",
      "RSUs",
      "Free meals",
    ],
    companyDescription:
      "Meta builds technologies that help people connect and share.",
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "Spotify",
    location: "Stockholm",
    salary: "14.0 - 20.0k PLN",
    type: "Full-time",
    workMode: "Hybrid",
    postedAt: "4 days ago",
    deadline: "Mar 5, 2026",
    experience: "3-5 years",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Statistics"],
    description: `Use data to improve music recommendations for millions of listeners.`,
    benefits: [
      "Competitive salary",
      "Flexible hours",
      "Free Spotify Premium",
      "Parental leave",
    ],
    companyDescription:
      "Spotify is a digital music service that gives you access to millions of songs.",
  },
];

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
    resume: null,
    coverLetter: "",
    linkedIn: "",
    portfolio: "",
    experience: "",
    expectedSalary: "",
    noticePeriod: "",
    whyJoin: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const user = {
    fullName: "Anne Douglas",
    email: "anne@example.com",
  };

  const job = mockJobs.find((j) => j.id === parseInt(id));

  if (!job) {
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
          <main className="flex-1 overflow-y-auto p-6">
            <Card className="text-center py-12">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Job not found
              </h2>
              <p className="text-muted-foreground mb-4">
                The job you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate("/user/jobs")}>
                Back to Job Board
              </Button>
            </Card>
          </main>
        </div>
      </div>
    );
  }

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setApplicationData({ ...applicationData, resume: file });
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);

    // Close modal after showing success
    setTimeout(() => {
      setShowApplyModal(false);
      setSubmitted(false);
      navigate("/user/applications");
    }, 2000);
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
          {/* Back Button */}
          <button
            onClick={() => navigate("/user/jobs")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Jobs
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Header */}
              <Card>
                <div className="flex items-start gap-4">
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0 ${getLogoColor(
                      job.company
                    )}`}
                  >
                    {job.company?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-xl font-semibold text-foreground">
                      {job.title}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      {job.company} • {job.location}
                    </p>
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <Badge variant="outline">{job.type}</Badge>
                      <Badge variant="outline">{job.workMode}</Badge>
                      <Badge variant="default">{job.experience}</Badge>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Job Description */}
              <Card>
                <h2 className="text-base font-semibold text-foreground mb-4">
                  Job Description
                </h2>
                <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                  {job.description}
                </div>
              </Card>

              {/* Skills */}
              <Card>
                <h2 className="text-base font-semibold text-foreground mb-4">
                  Required Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="px-3 py-1.5">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Benefits */}
              <Card>
                <h2 className="text-base font-semibold text-foreground mb-4">
                  Benefits
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {job.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-muted-foreground">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* About Company */}
              <Card>
                <h2 className="text-base font-semibold text-foreground mb-4">
                  About {job.company}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {job.companyDescription}
                </p>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <Card className="sticky top-6">
                <div className="text-center mb-4">
                  <p className="text-2xl font-semibold text-foreground">
                    {job.salary}
                  </p>
                  <p className="text-sm text-muted-foreground">Monthly salary</p>
                </div>

                <Button
                  className="w-full mb-4"
                  onClick={() => setShowApplyModal(true)}
                >
                  Apply Now
                </Button>

                <Button variant="outline" className="w-full">
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
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  Save Job
                </Button>

                <div className="border-t border-border mt-4 pt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Posted</span>
                    <span className="text-foreground">{job.postedAt}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Deadline</span>
                    <span className="text-foreground">{job.deadline}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="text-foreground">{job.experience}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Apply for {job.title}
                </h2>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>
              <button
                onClick={() => setShowApplyModal(false)}
                className="p-2 hover:bg-muted rounded-md transition-colors"
              >
                <svg
                  className="w-5 h-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            {submitted ? (
              <div className="p-6 text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Application Submitted!
                </h3>
                <p className="text-muted-foreground">
                  Your application has been sent to {job.company}. Good luck!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="p-6 space-y-5">
                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Resume / CV <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      applicationData.resume
                        ? "border-brand bg-brand/5"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="resume-upload"
                      required
                    />
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer block"
                    >
                      {applicationData.resume ? (
                        <div className="flex items-center justify-center gap-2 text-brand">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span className="font-medium">
                            {applicationData.resume.name}
                          </span>
                        </div>
                      ) : (
                        <>
                          <svg
                            className="w-8 h-8 text-muted-foreground mx-auto mb-2"
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
                          <p className="text-sm text-muted-foreground">
                            <span className="text-brand font-medium">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PDF, DOC, DOCX (max 5MB)
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us why you're interested in this position..."
                    value={applicationData.coverLetter}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        coverLetter: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand resize-none"
                  />
                </div>

                {/* LinkedIn & Portfolio */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/..."
                      value={applicationData.linkedIn}
                      onChange={(e) =>
                        setApplicationData({
                          ...applicationData,
                          linkedIn: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Portfolio URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={applicationData.portfolio}
                      onChange={(e) =>
                        setApplicationData({
                          ...applicationData,
                          portfolio: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                    />
                  </div>
                </div>

                {/* Experience & Salary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Years of Experience <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={applicationData.experience}
                      onChange={(e) =>
                        setApplicationData({
                          ...applicationData,
                          experience: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                    >
                      <option value="">Select...</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-7">5-7 years</option>
                      <option value="7+">7+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Expected Salary (PLN)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 12,000"
                      value={applicationData.expectedSalary}
                      onChange={(e) =>
                        setApplicationData({
                          ...applicationData,
                          expectedSalary: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                    />
                  </div>
                </div>

                {/* Notice Period */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Notice Period <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={applicationData.noticePeriod}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        noticePeriod: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                  >
                    <option value="">Select...</option>
                    <option value="immediate">Immediate</option>
                    <option value="1-week">1 week</option>
                    <option value="2-weeks">2 weeks</option>
                    <option value="1-month">1 month</option>
                    <option value="2-months">2 months</option>
                    <option value="3-months">3 months</option>
                  </select>
                </div>

                {/* Why do you want to join */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Why do you want to join {job.company}?
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Share what excites you about this opportunity..."
                    value={applicationData.whyJoin}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        whyJoin: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowApplyModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
