import React from "react";
import { BsEmojiTearFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center   px-6 py-12 text-center  backdrop-blur-md bg-white/20 border-b border-white/20 transition-shadow duration-300">
      {/* Big 404 */}
      <h1 className="text-7xl md:text-9xl font-extrabold text-gray-200 italic flex items-center gap-3">
        404 <BsEmojiTearFill className="text-yellow-300" />
      </h1>
      <p className="mt-6 text-2xl md:text-3xl font-semibold text-gray-300">
        Oops! Page Not Found
      </p>
      <p className="mt-4 text-gray-50 max-w-lg">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      {/* Go back home button */}
      <div className="mt-8">
        <Link
          to="/"
          className="flex items-center px-6 py-3 gap-2 bg-orange-600 text-white font-medium rounded-xl shadow hover:bg-orange-700 transition"
        >
          Go Back Home <FaPersonWalkingDashedLineArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
