import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";

const scriptures = [
  "Matthew 6:33 - But seek first the kingdom of God and his righteousness, and all these things will be added to you.",
  "John 3:16 - For God so loved the world that He gave His one and only Son, that whoever believes in Him shall not perish but have eternal life.",
  "Psalm 23:1 - The Lord is my shepherd, I lack nothing.",
  "Isaiah 40:31 - But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
];

const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === scriptures.length - 1 ? 0 : prev + 1
      );
    }, 4000); // 4 seconds interval
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>
        <section
          className="relative w-full h-[90vh] flex items-center justify-center text-center text-white pt-16"
          style={{
            backgroundImage: "url('/images/pst1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Content */}
          <div className="relative z-10 px-6 max-w-3xl">
            {/* Animated Church Name */}
            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Hunger For God
            </motion.h1>

            {/* Sliding Scriptures */}
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-lg md:text-2xl italic mb-6"
            >
              {scriptures[currentIndex]}
            </motion.p>

            {/* Social Handles */}
            <h3 className=" py-5 text-lg font-bold">Live stream anywhere</h3>
            <div className="flex justify-center gap-5 mb-8 text-2xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500"
              >
                <FaYoutube />
              </a>
              <a
                href="https://wa.me/yourNumber"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500"
              >
                <FaTiktok />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500"
              >
                <FaTwitter />
              </a>
            </div>

            {/* Call to Action */}
            <a
              href="https://m.youtube.com/@hungryforgod"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold shadow-lg transition"
            >
              Join Us This Sunday Live
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default HeroSection;
