import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/public/LandingPage.jsx";
import SignIn from "./pages/public/SignIn.jsx";
import SignUp from "./pages/public/SignUp.jsx";
import UserDashboard from "./pages/User/UserDashboard.jsx";
import JobBoard from "./pages/User/JobBoard.jsx";
import JobDetails from "./pages/User/JobDetails.jsx";
import MyApplications from "./pages/User/MyApplications.jsx";
import UserInterviews from "./pages/User/UserInterviews.jsx";
import UserProfile from "./pages/User/UserProfile.jsx";
import UserSettings from "./pages/User/UserSettings.jsx";
import HRDashboard from "./pages/HR/HRDashboard.jsx";
import PostJob from "./pages/HR/PostJob.jsx";
import MyJobs from "./pages/HR/MyJobs.jsx";
import Candidates from "./pages/HR/Candidates.jsx";
import Interviews from "./pages/HR/Interviews.jsx";
import Settings from "./pages/HR/Settings.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* User/Job Seeker Routes */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/jobs" element={<JobBoard />} />
        <Route path="/user/jobs/:id" element={<JobDetails />} />
        <Route path="/user/applications" element={<MyApplications />} />
        <Route path="/user/interviews" element={<UserInterviews />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/settings" element={<UserSettings />} />

        {/* HR Routes */}
        <Route path="/hr/dashboard" element={<HRDashboard />} />
        <Route path="/hr/post-job" element={<PostJob />} />
        <Route path="/hr/my-jobs" element={<MyJobs />} />
        <Route path="/hr/candidates" element={<Candidates />} />
        <Route path="/hr/interviews" element={<Interviews />} />
        <Route path="/hr/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
