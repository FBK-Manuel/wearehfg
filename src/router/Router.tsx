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
          element: <file.PrayerRequest />,
        },
        {
          path: "gallary",
          element: <file.Gallary />,
        },
        {
          path: "donation",
          element: <file.Donation />,
        },
        {
          path: "testimony",
          element: <file.Testimony />,
        },
        {
          path: "evangelism",
          element: <file.Evangelism />,
        },
        {
          path: "bookclub",
          element: <file.BookClub />,
        },
        {
          path: "salvation",
          element: <file.Salvation />,
        },
        {
          path: "faq",
          element: <file.FAQ />,
        },
      ],
      errorElement: <file.NotFound />,
    },
    // shop routing
    {
      path: "/shop",
      element: <file.ShopLayout />,
      children: [
        {
          path: "",
          element: <file.Shop />,
        },
        {
          path: "all-shop",
          element: <file.AllShop />,
        },
        {
          path: "shop-contact",
          element: <file.ShopContact />,
        },
        {
          path: "product-details/:id",
          element: <file.ProductDetails />,
        },
        {
          path: "cart",
          element: <file.ShoppingCart />,
        },
        {
          path: "checkout",
          element: <file.Checkout />,
        },
        {
          path: "favorites",
          element: <file.Wishlist />,
        },
        {
          path: "pp",
          element: <file.PP />,
        },
        {
          path: "sp",
          element: <file.SP />,
        },
        {
          path: "rp",
          element: <file.RP />,
        },
        {
          path: "tos",
          element: <file.ToS />,
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
          path: "forgot-password",
          element: <file.ForgotPassword />,
        },
        {
          path: "reset-password",
          element: <file.ChangePassword />,
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
