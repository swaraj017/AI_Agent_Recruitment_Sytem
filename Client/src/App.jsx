import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/public/LandingPage.jsx";
import SignIn from "./pages/public/SignIn.jsx";
import SignUp from "./pages/public/SignUp.jsx";
import UserDashboard from "./pages/User/UserDashboard.jsx";
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
        <Route path="/user/jobs" element={<UserDashboard />} />
        <Route path="/user/schedule" element={<UserDashboard />} />
        <Route path="/user/messenger" element={<UserDashboard />} />

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
