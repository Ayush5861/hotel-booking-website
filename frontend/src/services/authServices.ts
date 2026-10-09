import axios from "axios";
import type { LoginData, SignupData } from "../types/auth";

const API = import.meta.env.VITE_API_URL;

export const signupUser = async (data: SignupData) => {
  const response = await axios.post(`${API}/auth/signup`, data);
  return response.data;
};

export const loginUser = async (data: LoginData) => {
  const response = await axios.post(`${API}/auth/login`, data);
  return response.data;
};