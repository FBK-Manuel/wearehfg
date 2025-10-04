import React from "react";
import { Outlet } from "react-router-dom";
// import Footer from "../components/Footer";
import ShopNavbar from "../components/ShopNavbar";
import ShopFooter from "../components/ShopFooter";

const ShopLayout: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        {/* ✅ Navbar always on top */}
        <ShopNavbar />

        {/* ✅ Main page content */}
        <main className="flex-1 container mx-auto px-4 py-6">
          <Outlet />
        </main>

        {/* ✅ Footer always at bottom */}
        <footer>
          <ShopFooter />
        </footer>
      </div>
    </div>
  );
};

export default ShopLayout;
