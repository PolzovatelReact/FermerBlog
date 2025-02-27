import React from "react";
import { Outlet, Navigate } from "react-router-dom";

interface PrivateRoutesProps {
  isAuthenticated: boolean;
  redirectTo?: string;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({
  isAuthenticated,
  redirectTo = "/login",
}) => {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PrivateRoutes;

// import React, { JSX } from "react";
// import { Navigate } from "react-router-dom";

// interface ProtectedRouteProps {
//   children: JSX.Element;
//   isAuthenticated: boolean;
//   redirectTo?: string;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//   children,
//   isAuthenticated,
//   redirectTo = "/login",
// }) => {
//   if (!isAuthenticated) {
//     return <Navigate to={redirectTo} />;
//   }

//   return children;
// };

// export default ProtectedRoute;
