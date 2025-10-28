const ROUTES = {
  HOME: "/",
  PROFILE: "/profile",
  DASHBOARD: "/dashboard",
  AUTH: {
    ROOT: "/auth",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  NOT_FOUND: "*",
} as const;

export default ROUTES;
