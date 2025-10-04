import React from "react";
import { motion } from "framer-motion";

const scriptures = [
  "Matthew 6:33 - But seek first the kingdom of God and his righteousness, and all these things will be added to you.",
  "John 3:16 - For God so loved the world that He gave His one and only Son, that whoever believes in Him shall not perish but have eternal life.",
  "Psalm 23:1 - The Lord is my shepherd, I lack nothing.",
  "Isaiah 40:31 - But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
];

const TextSlider: React.FC = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap w-full bg-transparent text-white text-lg md:text-2xl mb-6">
      <motion.div
        className="inline-flex gap-16" // space between scriptures
        animate={{ x: ["100%", "-100%"] }} // slide right → left
        transition={{
          ease: "linear",
          duration: 55, // speed (seconds) - adjust as needed
          repeat: Infinity,
        }}
      >
        {/* Duplicate scriptures twice for smooth infinite loop */}
        {[...scriptures, ...scriptures].map((verse, idx) => (
          <span key={idx} className="px-4">
            {verse}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default TextSlider;
