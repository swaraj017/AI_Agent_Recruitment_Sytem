import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Header } from "../../components/layout";
import { Card, Button, Input, Badge } from "../../components/common";

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

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];
const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Lead", "Manager"];

const PostJob = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    experience: "Mid Level",
    salaryMin: "",
    salaryMax: "",
    salaryCurrency: "PLN",
    description: "",
    requirements: "",
    responsibilities: "",
    benefits: "",
    deadline: "",
  });

  const user = {
    fullName: "HR Manager",
    email: "hr@company.com",
    role: "HR",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills((prev) => [...prev, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobData = { ...formData, skills };
    console.log("Job Posted:", jobData);
    // TODO: API call to post job
    navigate("/hr/my-jobs");
  };

  const steps = [
    { num: 1, label: "Basic Info" },
    { num: 2, label: "Requirements" },
    { num: 3, label: "Description" },
  ];

  return (
    <div className="h-screen flex bg-gray-50/50">
      <Sidebar navItems={navItems} />

      <div className="flex-1 flex flex-col ml-64">
        <Header user={user} />

        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Post New Job</h1>
              <p className="text-gray-500 text-sm">Create a new job posting to attract candidates</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              {steps.map((step, index) => (
                <React.Fragment key={step.num}>
                  <div
                    className={`flex items-center gap-2 cursor-pointer ${
                      currentStep >= step.num ? "text-secondary" : "text-gray-400"
                    }`}
                    onClick={() => setCurrentStep(step.num)}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        currentStep >= step.num
                          ? "bg-secondary text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {currentStep > step.num ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        step.num
                      )}
                    </div>
                    <span className="text-sm font-medium hidden sm:block">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 sm:w-24 h-0.5 mx-2 ${currentStep > step.num ? "bg-secondary" : "bg-gray-200"}`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <Card className="p-6">
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                        <Input
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="e.g. Senior Frontend Developer"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your company name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                        <Input
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="e.g. Remote, Warsaw, Hybrid"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Type *</label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                        >
                          {jobTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level *</label>
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                        >
                          {experienceLevels.map((level) => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                        <div className="flex items-center gap-2">
                          <Input
                            name="salaryMin"
                            type="number"
                            value={formData.salaryMin}
                            onChange={handleChange}
                            placeholder="Min"
                          />
                          <span className="text-gray-400">-</span>
                          <Input
                            name="salaryMax"
                            type="number"
                            value={formData.salaryMax}
                            onChange={handleChange}
                            placeholder="Max"
                          />
                          <select
                            name="salaryCurrency"
                            value={formData.salaryCurrency}
                            onChange={handleChange}
                            className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                          >
                            <option value="PLN">PLN</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
                        <Input
                          name="deadline"
                          type="date"
                          value={formData.deadline}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Requirements */}
                {currentStep === 2 && (
                  <div className="space-y-5">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills & Requirements</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
                      <Input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleAddSkill}
                        placeholder="Type a skill and press Enter (e.g. React, TypeScript)"
                      />
                      <div className="flex flex-wrap gap-2 mt-3">
                        {skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            removable
                            onRemove={() => handleRemoveSkill(skill)}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Requirements *</label>
                      <textarea
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none resize-none"
                        placeholder="List the requirements for this position (one per line)&#10;• 3+ years of experience with React&#10;• Strong TypeScript skills&#10;• Experience with REST APIs"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                      <textarea
                        name="benefits"
                        value={formData.benefits}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none resize-none"
                        placeholder="List the benefits (one per line)&#10;• Remote work&#10;• Health insurance&#10;• Learning budget"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Description */}
                {currentStep === 3 && (
                  <div className="space-y-5">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none resize-none"
                        placeholder="Describe the job role, team, and what the candidate will be working on..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Key Responsibilities *</label>
                      <textarea
                        name="responsibilities"
                        value={formData.responsibilities}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none resize-none"
                        placeholder="List the key responsibilities (one per line)&#10;• Develop and maintain frontend applications&#10;• Collaborate with design team&#10;• Code reviews and mentoring"
                        required
                      />
                    </div>

                    {/* Preview */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Preview</h3>
                      <div className="bg-white rounded-xl p-4 border border-gray-200">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{formData.title || "Job Title"}</h4>
                            <p className="text-sm text-gray-500">{formData.company || "Company"} • {formData.location || "Location"}</p>
                          </div>
                          <Badge variant="success">{formData.type}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {skills.slice(0, 5).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 mt-3">
                          {formData.salaryMin && formData.salaryMax
                            ? `${formData.salaryMin} - ${formData.salaryMax} ${formData.salaryCurrency}`
                            : "Salary not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>

                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={() => setCurrentStep((prev) => Math.min(3, prev + 1))}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button type="submit">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Post Job
                    </Button>
                  )}
                </div>
              </Card>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PostJob;
