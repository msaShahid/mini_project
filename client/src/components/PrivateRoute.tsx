import React from "react";
import { Navigate, useLocation } from "react-router-dom";
//import { useAuth } from "../context/AuthContext";
import ROUTES from "../routes/ROUTES";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux/store";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {

  // redux
  const { user } = useSelector((state: RootState) => state.auth);

  // Context API version 
  // const { user } = useAuth();
  
  const location = useLocation();

  if (!user) {
    return <Navigate to={ROUTES.AUTH.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
