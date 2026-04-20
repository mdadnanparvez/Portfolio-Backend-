import axios from "axios";

export const getPortfolio = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/portfolio`);
  return res.data.data;
};