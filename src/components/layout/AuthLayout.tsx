import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export function AuthLayout() {
  const auth = useAuth();

  if (auth.user) {
    return <Navigate to="/app/home" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Outlet />
    </div>
  );
}
