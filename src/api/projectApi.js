import axios from "axios";

export const getProjects = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
  return res.data.data || [];
};