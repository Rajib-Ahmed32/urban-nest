import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const saveUserToDB = async (user) => {
  const res = await axios.post(`${BASE_URL}/users`, user);
  return res.data;
};

export const getUserFromDB = async (email) => {
  try {
    const res = await axios.get(`${BASE_URL}/users`, {
      params: { email },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch user from DB:", error);
    return null;
  }
};
