import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Header } from "../../components/layout";
import { Card, Button, Input, Badge } from "../../components/common";
import { hrNavItems } from "./hrNavItems";
import api from "../../services/api";

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];
const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Lead", "Manager"];

const PostJob = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full-time",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = { ...formData, skills: skills };
    console.log("Job Posted:", jobData);
    // TODO: API call to post job
    try{

      const response = await api.post("/hr/jobs", jobData);
      console.log("Job posted successfully:", response.data);
    }catch(err){
      console.log("Failed to post job:", err);
    }


    
    // navigate("/hr/my-jobs");
  };

  const steps = [
    { num: 1, label: "Basic Info" },
    { num: 2, label: "Requirements" },
    { num: 3, label: "Description" },
  ];

  return (
    <div className="h-screen flex bg-background">
      <Sidebar navItems={hrNavItems} isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className={`flex-1 flex flex-col transition-all duration-200 ${sidebarOpen ? 'lg:ml-56' : 'lg:ml-16'}`}>
        <Header user={user} onMenuClick={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-foreground">Post New Job</h1>
              <p className="text-muted-foreground text-sm">Create a new job posting to attract candidates</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              {steps.map((step, index) => (
                <React.Fragment key={step.num}>
                  <div
                    className={`flex items-center gap-2 cursor-pointer ${
                      currentStep >= step.num ? "text-foreground" : "text-muted-foreground"
                    }`}
                    onClick={() => setCurrentStep(step.num)}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        currentStep >= step.num
                          ? "bg-foreground text-white"
                          : "bg-muted text-muted-foreground"
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
                    <div className={`w-16 sm:w-24 h-0.5 mx-2 ${currentStep > step.num ? "bg-foreground" : "bg-muted"}`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <Card className="p-6">
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Basic Information</h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-1">Job Title *</label>
                        <Input
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="e.g. Senior Frontend Developer"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Company Name *</label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your company name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Location *</label>
                        <Input
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="e.g. Remote, Warsaw, Hybrid"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Job Type *</label>
                        <select
                          name="jobType"
                          value={formData.jobType}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-border text-sm bg-card focus:border-foreground focus:ring-1 focus:ring-foreground/10 outline-none"
                        >
                          {jobTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Experience Level *</label>
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-border text-sm bg-card focus:border-foreground focus:ring-1 focus:ring-foreground/10 outline-none"
                        >
                          {experienceLevels.map((level) => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Salary Range</label>
                        <div className="flex items-center gap-2">
                          <Input
                            name="salaryMin"
                            type="number"
                            value={formData.salaryMin}
                            onChange={handleChange}
                            placeholder="Min"
                          />
                          <span className="text-muted-foreground">-</span>
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
                            className="px-3 py-2.5 rounded-lg border border-border text-sm bg-card focus:border-foreground focus:ring-1 focus:ring-foreground/10 outline-none"
                          >
                            <option value="PLN">PLN</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Application Deadline</label>
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
                    <h2 className="text-lg font-semibold text-foreground mb-4">Skills & Requirements</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Required Skills</label>
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
                      <label className="block text-sm font-medium text-foreground mb-1">Requirements *</label>
                      <textarea
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border border-border text-sm bg-card focus:border-foreground focus:ring-1 focus:ring-foreground/10 outline-none resize-none"
                        placeholder="List the requirements for this position (one per line)&#10;• 3+ years of experience with React&#10;• Strong TypeScript skills&#10;• Experience with REST APIs"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Benefits</label>
                      <textarea
                        name="benefits"
                        value={formData.benefits}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-border text-sm bg-card focus:border-foreground focus:ring-1 focus:ring-foreground/10 outline-none resize-none"
                        placeholder="List the benefits (one per line)&#10;• Remote work&#10;• Health insurance&#10;• Learning budget"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Description */}
                {currentStep === 3 && (
                  <div className="space-y-5">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Job Description</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Job Description *</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border border-border text-sm bg-card focus:border-foreground focus:ring-1 focus:ring-foreground/10 outline-none resize-none"
                        placeholder="Describe the job role, team, and what the candidate will be working on..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Key Responsibilities *</label>
                      <textarea
                        name="responsibilities"
                        value={formData.responsibilities}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border border-border text-sm bg-card focus:border-foreground focus:ring-1 focus:ring-foreground/10 outline-none resize-none"
                        placeholder="List the key responsibilities (one per line)&#10;• Develop and maintain frontend applications&#10;• Collaborate with design team&#10;• Code reviews and mentoring"
                        required
                      />
                    </div>

                    {/* Preview */}
                    <div className="bg-muted rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-foreground mb-3">Preview</h3>
                      <div className="bg-card rounded-lg p-4 border border-border">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-foreground">{formData.title || "Job Title"}</h4>
                            <p className="text-sm text-muted-foreground">{formData.company || "Company"} • {formData.location || "Location"}</p>
                          </div>
                          <Badge variant="success">{formData.type}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {skills.slice(0, 5).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                          {formData.salaryMin && formData.salaryMax
                            ? `${formData.salaryMin} - ${formData.salaryMax} ${formData.salaryCurrency}`
                            : "Salary not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
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
