import { lazy, Suspense, type ComponentType, type ReactElement } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import { NotFound } from "../pages/NotFound";
import PrivateRoute from "../components/PrivateRoute";
import ROUTES from "./ROUTES";
import Spinner from "../components/common/Spinner";


const Home = lazy(() => import("../pages/Home"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Profile = lazy(() => import("../pages/Profile"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));

const withSuspense = (Component: ComponentType): ReactElement => (
  <Suspense fallback={<Spinner/>}>
    <Component />
  </Suspense>
);

const withAuth = (Component: ComponentType): ReactElement => (
  <PrivateRoute>{withSuspense(Component)}</PrivateRoute>
);


const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: withSuspense(Home) },
      { path: ROUTES.DASHBOARD, element: withAuth(Dashboard) },
      { path: ROUTES.PROFILE, element: withAuth(Profile) }, 
    ],
  },
  {
    path: ROUTES.AUTH.ROOT,
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      { path: ROUTES.AUTH.LOGIN, element: withSuspense(Login) },
      { path: ROUTES.AUTH.REGISTER, element: withSuspense(Register) },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFound />,
  },
]);

export default router;
