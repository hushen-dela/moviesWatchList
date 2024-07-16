// Protected route
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const ProtectedRoute = ({ children }: any) => {
  const auth = useAuth();
  console.log("🚀 ~ ProtectedRoute ~ auth:", auth);
  if (!auth.user) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};
