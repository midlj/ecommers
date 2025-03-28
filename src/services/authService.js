import axios from "axios";
import { API_BASE_URL } from "../config";

export const login = async ({email, password}) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
  return response.data;
};

export const registerUser = async ({name, email, password}) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password });
  return response.data;
};

export const logoutUser = async (email) => {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`,{email});
  return response.data;
  };