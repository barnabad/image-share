import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Layout from "./components/Layout";
import PersistentAuth from "./components/PersistentAuth";
import ProfilePage from "./pages/ProfilePage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PersistentAuth />,
        children: [
          {
            path: "/",
            element: <ProtectedRoute />,
            children: [
              {
                index: true,
                element: <HomePage />,
              },
              {
                path: "/profile",
                element: <ProfilePage />,
              },
            ],
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
        ],
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
    ],
  },
]);

export default router;
