import axios from "axios";

const api = axios.create({
  baseURL: "https://quiz-app-2-ajym.onrender.com/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;


