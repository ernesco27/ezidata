import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "../components/App";
import { ErrorPage } from "../components/ErrorPage";
import { Home } from "../components/Home";
import { Airteltigo } from "./Airteltigo";
import { Mtn } from "./Mtn";
import { AdminLogin } from "./AdminLogin";
import { AdminDashboard } from "../pages/dashboard/AdminDashboard";

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
          path: "/Mtn",
          element: <Mtn />,
        },
        {
          path: "/Airteltigo",
          element: <Airteltigo />,
        },
        {
          path: "/Eziadmin",
          element: <AdminLogin />,
        },
        {
          path: "/Dashboard",
          element: <AdminDashboard />,
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
