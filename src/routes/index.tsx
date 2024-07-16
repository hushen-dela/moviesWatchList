import { ProtectedRoute } from "@/components/custom/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import RootLayout from "@/components/layout/RootLayout";
import Home from "@/components/screen/home";
import LandingPage from "@/components/screen/LandingPage";
import { LoginPage } from "@/components/screen/login";
import MovieDetails from "@/components/screen/MovieDetails";
import PlayListPage from "@/components/screen/PlayListPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "app",
        element: (
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "movie/:id",
            element: <MovieDetails />,
          },
          {
            path: "playlist/:id",
            element: <PlayListPage />,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "*",
            element: <div>404</div>,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);
const Routes = () => <RouterProvider router={router} />;
export default Routes;
