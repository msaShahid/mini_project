"use client";
import { useReducer, useEffect, useCallback, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../types/User";
import { GuestApi } from "../api/axiosClient";

interface AuthState {
  user: User | null;
  token: string | null;
}

type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
  | { type: "LOGOUT" };

const initialState: AuthState = {
  user: null,
  token: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { user: action.payload.user, token: action.payload.token };
    case "LOGOUT":
      return { user: null, token: null };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore auth state from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        const parsedUser: User = JSON.parse(storedUser);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: parsedUser, token: storedToken },
        });
      }
    } catch (error) {
      console.error("Failed to restore auth state:", error);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      try {
        const res = await GuestApi.post("/users/login", { email, password });

        if (!res.data?.success) {
          throw new Error(res.data?.message || "Login failed");
        }

        const { _id, name, email: userEmail, token } = res.data.data;
        if (!_id || !token) throw new Error("Invalid login response");

        const user: User = { id: _id, name, email: userEmail };

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        dispatch({ type: "LOGIN_SUCCESS", payload: { user, token } });
      } catch (err: any) {
        console.error("Login error:", err);
        throw new Error(err.response?.data?.message || err.message || "Login failed");
      }
    },
    []
  );

  const register = useCallback(
    async (name: string, email: string, password: string): Promise<void> => {
      try {
        const res = await GuestApi.post("/users/register", { name, email, password });

        if (!res.data?.success) {
          throw new Error(res.data?.message || "Registration failed");
        }

        // Automatically log in after registration
        await login(email, password);
      } catch (err: any) {
        console.error("Registration error:", err);
        throw new Error(err.response?.data?.message || err.message || "Registration failed");
      }
    },
    [login]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  }, []);

  const value = { user: state.user, token: state.token, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
