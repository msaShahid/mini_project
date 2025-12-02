import { GuestApi, AuthApi } from "../api/axiosClient";
import { endpoints } from "./endpoints";
import { User, LoginResponse, RegisterResponse, LoginPayload, RegisterPayload } from "../types/User";

export const usersApi = {

  async userRegister(data: RegisterPayload): Promise<User> {
    const response = await GuestApi.post<RegisterResponse>(endpoints.user.register, data);

    if (!response.data || !response.data.data) {
      throw new Error(response.data?.message || "Registration failed");
    }
    return response.data.data; 
  },

  async login(data: LoginPayload): Promise<User> {
    const response = await GuestApi.post<LoginResponse>(endpoints.user.login, data);
    const body = response.data;
    
    if (!body.success) {
      throw new Error(body.message || "Login failed");
    }

    const userData: User = body.data;
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));

    return userData;
  },


  async getProfile(): Promise<User> {
    const response = await AuthApi.get<{ success: boolean; data: User }>(endpoints.user.profile);

    if (!response.data.success) {
      throw new Error("Failed to fetch profile");
    }

    return response.data.data;
  },

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
