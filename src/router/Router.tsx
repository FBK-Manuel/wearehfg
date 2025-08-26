import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { file } from "../constants/Index";

const Router: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <file.RootLayout />,
      children: [
        {
          index: true,
          element: <file.Home />,
        },
        {
          path: "about-us",
          element: <file.AboutUs />,
        },
        {
          path: "contact",
          element: <file.Contact />,
        },
        {
          path: "prayer",
          element: <file.Contact />,
        },
        {
          path: "gallary",
          element: <file.Contact />,
        },
        {
          path: "donation",
          element: <file.Contact />,
        },
        {
          path: "testimony",
          element: <file.Contact />,
        },
        {
          path: "evangelism",
          element: <file.Contact />,
        },
        {
          path: "bookclub",
          element: <file.Contact />,
        },
        {
          path: "salvation",
          element: <file.Contact />,
        },
      ],
      errorElement: <file.NotFound />,
    },

    // Authentication routing....
    {
      path: "/auth",
      element: <file.AuthLayout />,
      children: [
        {
          path: "",
          element: <file.Login />,
        },
        {
          path: "login",
          element: <file.Login />,
        },
        {
          path: "register",
          element: <file.Register />,
        },
      ],
      errorElement: <file.NotFound />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default Router;
