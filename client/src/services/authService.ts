import { GuestApi, AuthApi } from "../api/axiosClient";
import { endpoints } from "../api/endpoints";
import { User, LoginPayload, RegisterPayload, LoginResponse } from "../types/User";
import { handleApiError } from "../utils/apiHandler";

/**
 * Auth service with clean API calls and strong typing.
 * GuestApi = unauthenticated endpoints
 * AuthApi = authenticated endpoints (requires token in localStorage)
 */
export const authService = {

  async register(data: RegisterPayload): Promise<User> {
    try {
      const response = await GuestApi.post<User>(endpoints.users.register, data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async login(data: LoginPayload): Promise<LoginResponse> {
    try {
      const response = await GuestApi.post<LoginResponse>(endpoints.users.login, data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async getProfile(): Promise<User> {
    try {
      const response = await AuthApi.get<User>(endpoints.users.profile);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  logout(): void {
    localStorage.removeItem("token");
    window.location.href = "/login";
  },
};
