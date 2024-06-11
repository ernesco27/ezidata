import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { App } from "../components/App";
import { ErrorPage } from "../components/ErrorPage";
import { Home } from "../components/Home";
import { About } from "./About";
import { Contact } from "./Contact";
import { PrivacyPolicy } from "./PrivacyPolicy";

import { AdminLogin } from "./AdminLogin";
import { AdminArea } from "../components/AdminArea";
import { Dashboard } from "./Dashboard";
import { Packages } from "./Packages";
import { PackageDetails } from "./PackageDetails";
import Orders from "./Orders";

function Router() {
  const isAuthenticated = () => {
    // Replace this with your actual authentication logic
    return !!localStorage.getItem("isAuthenticated");
  };

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/auth" />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/network/:networkName",
          element: <PackageDetails />,
        },

        {
          path: "/auth",
          element: <AdminLogin />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/privacy-policy",
          element: <PrivacyPolicy />,
        },
        {
          path: "/admin",
          element: <AdminArea />,
          children: [
            {
              index: true,
              element: <AdminLogin />,
            },
            {
              path: "/admin/dashboard",
              element: <ProtectedRoute element={<Dashboard />} />,
              //element: <Dashboard />,
            },
            {
              path: "/admin/packages",
              element: <ProtectedRoute element={<Packages />} />,
              //element: <Packages />,
            },
            {
              path: "/admin/orders",
              element: <ProtectedRoute element={<Orders />} />,
              //element: <Orders />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export { Router };
