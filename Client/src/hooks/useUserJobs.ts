import { useState, useEffect } from "react";
import api from "../services/api";

export const useUserJobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/user/jobs");
        if (response.data && response.data.success) {
          setJobs(response.data.jobs || []);
        } else if (Array.isArray(response.data)) {
          setJobs(response.data);
        } else {
          setJobs([]);
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return { jobs, loading, error };
};
