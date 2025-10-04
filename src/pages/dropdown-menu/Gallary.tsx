import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "/images/slides/slide1.jpeg",
  "/images/slides/slide2.jpeg",
  "/images/slides/slide3.jpeg",
  "/images/slides/slide4.jpeg",
  "/images/slides/slide5.jpeg",
  "/images/slides/slide6.jpeg",
  "/images/slides/slide7.jpeg",
  "/images/slides/slide8.jpeg",
  "/images/slides/slide9.jpeg",
  "/images/slides/slide10.jpeg",
  "/images/slides/slide11.jpeg",
  "/images/slides/slide12.jpeg",
  "/images/slides/slide13.jpeg",
  "/images/slides/slide14.jpeg",
  "/images/slides/slide15.jpeg",
  "/images/slides/slide16.jpeg",
  "/images/slides/slide17.jpeg",
  "/images/slides/slide18.jpeg",
  "/images/slides/slide19.jpeg",
  "/images/slides/slide20.jpeg",
  "/images/slides/slide21.jpeg",
  "/images/slides/slide22.jpeg",
  // "/images/slides/slide23.jpeg",
  "/images/slides/slide24.jpeg",
  "/images/slides/slide25.jpeg",
  "/images/slides/slide26.jpeg",
];

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Big Preview Image with Arrows */}
      <div className="relative w-full h-[400px] md:h-[500px] mb-6">
        <motion.img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt="preview"
          className="w-full h-full object-cover rounded-xl shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        />

        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
        >
          <FaChevronLeft size={20} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {images.map((img, idx) => (
          <motion.img
            key={idx}
            src={img}
            alt={`thumb-${idx}`}
            className={`w-full h-24 object-cover rounded-lg cursor-pointer shadow-md ${
              currentIndex === idx ? "ring-4 ring-yellow-500" : ""
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
