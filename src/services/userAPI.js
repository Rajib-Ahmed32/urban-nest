import apiClient from "./apiClient";

export const saveUserToDB = async (user) => {
  const res = await apiClient.post("/users", user);
  return res.data;
};

export const getUserFromDB = async (email) => {
  try {
    const res = await apiClient.get("/users", {
      params: { email },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch user from DB:", error);
    return null;
  }
};
