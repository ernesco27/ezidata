import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "../components/App";
import { ErrorPage } from "../components/ErrorPage";
import { Home } from "../components/Home";
import { Airteltigo } from "./Airteltigo";
import { Mtn } from "./Mtn";
import { AdminLogin } from "./AdminLogin";
import { AdminArea } from "../components/AdminArea";
import { Dashboard } from "./Dashboard";
import { Packages } from "./Packages";
import { PackageDetails } from "./PackageDetails";

function Router() {
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
          path: "/admin",
          element: <AdminArea />,
          children: [
            {
              index: true,
              element: <AdminLogin />,
            },
            { path: "/admin/dashboard", element: <Dashboard /> },
            {
              path: "/admin/packages",
              element: <Packages />,
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
