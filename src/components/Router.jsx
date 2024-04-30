import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "../components/App";
import { ErrorPage } from "../components/ErrorPage";
import { Home } from "../components/Home";
import { Airteltigo } from "./Airteltigo";
import { Mtn } from "./Mtn";

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
        // {
        //   path: "/Checkout",
        //   element: <Checkout />,
        // },
        // {
        //   path: "/Product",
        //   element: <ProductPage />,
        // },
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
