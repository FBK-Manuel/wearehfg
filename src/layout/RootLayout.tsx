import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbarr from "../components/Navbarr";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

const RootLayout: React.FC = () => {
  return (
    <div>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        {/* ✅ Navbar always on top */}
        <Navbarr />

        {/* ✅ Main page content */}
        <main className="">
          <Outlet />
        </main>

        {/* ✅ Footer always at bottom */}
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default RootLayout;
