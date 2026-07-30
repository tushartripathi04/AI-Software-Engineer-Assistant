import axios from "axios";
console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);
// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000",
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;