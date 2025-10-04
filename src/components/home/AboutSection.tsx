import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutSection: React.FC = () => {
  const textPreview = `Our Story HUNGRY FOR GOD was birthed through the inspiration 
  of the Holy Spirit as a vibrant prayer movement. What began as a 
  small circle of about five believers in Massachusetts, under the 
  leadership of its visionary, Alberto Bruny, has now become a global family.`;

  return (
    <>
      {/* <h2 className="text-center font-bold text-lg md:text-4xl text-white underline mb-2">
        About Us
      </h2> */}
      <div className=" bg-black rounded-tr-4xl rounded-bl-4xl mb-3">
        <div className="flex-1 container mx-auto px-4 py-16">
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-12 items-center">
            {/* Text Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl md:text-3xl font-bold text-gray-50"
              >
                Our Story
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-gray-50 leading-relaxed"
              >
                {textPreview}...
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Link
                  to="/about-us"
                  className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold shadow-lg transition"
                >
                  Read More
                </Link>
              </motion.div>
            </motion.div>

            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <img
                src="/images/both3.png"
                alt="About Us"
                className="rounded-2xl shadow-lg w-full max-w-md object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
