import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "") ?? "http://localhost:5000";

const getToken = (): string | null => {
  if (typeof window !== "undefined") return localStorage.getItem("token");
  return null;
};

export const GuestApi = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

export const AuthApi = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

AuthApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    toast.error("Request error. Please try again.");
    console.error("[AuthApi] Request error:", error);
    return Promise.reject(error);
  }
);

AuthApi.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      toast.error("Unauthorized. Please log in again.");
      localStorage.removeItem("token");
      if (typeof window !== "undefined") window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
