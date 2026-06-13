import apiClient from "./apiClient";

export const loginUser = async (email, password) => {
  const response = await apiClient.post("/user/login", { email, password });
  return response.data; // Expected response structure: { success, token, user }
};

export const changePassword = async (newPassword) => {
  const response = await apiClient.put("/user/change-password", { newPassword });
  return response.data;
};

export const getUserEvents = async () => {
  const response = await apiClient.get("/user/events");
  return response.data.data || response.data.events || response.data;
};

export const registerForEvent = async (eventId) => {
  const response = await apiClient.post(`/user/events/register/${eventId}`);
  return response.data;
};

export const getMyEvents = async () => {
  const response = await apiClient.get("/user/my-events");
  return response.data.data || response.data.events || response.data;
};
