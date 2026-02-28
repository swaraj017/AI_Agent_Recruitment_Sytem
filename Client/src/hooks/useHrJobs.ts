import { useState, useEffect } from "react";
import api from "../services/api";

export const useHrJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/hr/jobs");
        setJobs(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // ← empty array = runs once

  return { jobs, loading, error };
};