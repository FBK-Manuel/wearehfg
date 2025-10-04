import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  //   "/images/slides/slide23.jpeg",
  "/images/slides/slide24.jpeg",
  "/images/slides/slide25.jpeg",
  "/images/slides/slide26.jpeg",
];

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerSlide, setItemsPerSlide] = useState(
    window.innerWidth < 768 ? 1 : 4
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto slide
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) =>
          prev + 1 >= Math.ceil(images.length / itemsPerSlide) ? 0 : prev + 1
        );
      }, 3000); // slide every 3s
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, itemsPerSlide]);

  // Handle resize for responsive slides
  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(window.innerWidth < 768 ? 1 : 4);
      setCurrentIndex(0); // reset to first slide after resize
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= Math.ceil(images.length / itemsPerSlide) ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? Math.ceil(images.length / itemsPerSlide) - 1 : prev - 1
    );
  };

  return (
    <>
      <div
        className="w-full px-4 py-10 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slider */}
        <div className="overflow-hidden">
          <motion.div
            className="flex transition-transform duration-700"
            animate={{
              x: `-${currentIndex * 100}%`,
            }}
          >
            {images.map((img, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / itemsPerSlide}%` }}
              >
                <motion.img
                  src={img}
                  alt={`slide-${idx}`}
                  className="w-full h-56 object-cover rounded-lg shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(img)}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
        >
          <FaChevronRight />
        </button>

        {/* Fullscreen Preview */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 text-white text-3xl hover:text-yellow-500"
              >
                <FaTimes />
              </button>

              {/* Large Image */}
              <motion.img
                src={selectedImage}
                alt="preview"
                className="max-w-[90%] max-h-[80%] object-contain rounded-xl shadow-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ImageSlider;
