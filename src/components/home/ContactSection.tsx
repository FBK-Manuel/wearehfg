import React from "react";
import { motion } from "framer-motion";
import { MdOutlineSupportAgent } from "react-icons/md";
import { Link } from "react-router-dom";

const ContactSection: React.FC = () => {
  return (
    <>
      <section
        className="relative w-full min-h-[70vh] flex items-center justify-center text-white rounded-br-4xl rounded-tl-4xl"
        style={{
          backgroundImage: "url('/images/slides/slide15.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 rounded-br-4xl rounded-tl-4xl"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-16 grid md:grid-cols-3 gap-10 items-center">
          {/* Animated Flip Card */}
          <motion.div
            className="w-full h-64 perspective cursor-pointer"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 hover:[transform:rotateY(180deg)]">
              {/* Front Side */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-orange-500 text-gray-50 font-bold rounded-xl shadow-xl [backface-visibility:hidden]">
                <h3 className="text-xl mb-2">
                  <MdOutlineSupportAgent size={30} />
                </h3>
                <h2 className="text-xl font-bold py-2">-- Call Us --</h2>
                <p>+1 234 567 890</p>
                <p>+234 801 234 5678</p>
                <p className="text-shadow-2xs py-3 font-medium">
                  Hungry for God
                </p>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white text-gray-900 rounded-xl shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <h3 className="text-xl mb-2">
                  <MdOutlineSupportAgent size={30} />
                </h3>
                <h2 className="text-xl font-bold py-2">-- Call Us --</h2>
                <p>+1 234 567 890</p>
                <p>+234 801 234 5678</p>
                <p className="text-shadow-2xs py-3 font-medium">
                  Hungry for God
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Text + Button (2/3) */}
          <div className="md:col-span-2 space-y-6">
            <motion.h2
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold"
            >
              Get in Touch With Us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-200"
            >
              We would love to connect with you! Whether it’s a prayer request,
              partnership, or general inquiry, our team is always ready to
              listen and respond.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold shadow-lg transition"
            >
              <Link to={"/contact"}>Contact Us</Link>
            </motion.button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
