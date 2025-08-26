import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 text-black">
          {/* Pages like Login/Register will render here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
