import React, { useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("job_seeker");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { email, password, role, fullName, companyName });
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          className="w-full p-2 border rounded mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="job_seeker">Job Seeker</option>
          <option value="hr">HR</option>
        </select>

        {role === "job_seeker" && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded mb-4"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        )}

        {role === "hr" && (
          <input
            type="text"
            placeholder="Company Name"
            className="w-full p-2 border rounded mb-4"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        )}

        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
