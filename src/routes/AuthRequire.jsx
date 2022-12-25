import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import useAuth from "../hooks/useAuth";

function AuthRequire({ children, allowRoles }) {
  const { isAuthenticated, isInitialized, role, user } = useAuth();
  const location = useLocation();
  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return allowRoles?.includes(role) ? (
    children
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default AuthRequire;
