import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8000/api" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (role) config.headers.Role = role;
  return config;
});



export default api;
