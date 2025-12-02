import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { usersApi } from "../../../api/usersApi";
import { User, LoginPayload, RegisterPayload } from "../../../types/User";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const localUser = localStorage.getItem("user");
const initialState: AuthState = {
  user: localUser ? JSON.parse(localUser!) : null,
  loading: false,
  error: null,
};

// Async Thunks
export const loginUser = createAsyncThunk<User, LoginPayload>(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const userData = await usersApi.login(credentials);
      return userData;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Login failed";
      return rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk<User, RegisterPayload>(
  "auth/registerUser",
  async (newUserData, { rejectWithValue }) => {
    try {
      const userCreated = await usersApi.userRegister(newUserData);
      return userCreated;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Registration failed";
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  usersApi.logout();
});

// Slice Definition
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      });
  },
});

export default authSlice.reducer;
