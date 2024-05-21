import { useContext } from "react";
import { Navigate, createRoutesFromChildren } from "react-router-dom";
import { AuthContext } from "./FirebaseContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
