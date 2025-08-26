import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaUsers,
  FaQuestion,
} from "react-icons/fa";
import {
  MdAddIcCall,
  MdAttachEmail,
  MdContactPhone,
  MdShoppingCart,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { RiShoppingBag4Fill } from "react-icons/ri";
const Footer: React.FC = () => {
  return (
    <footer className="bg-[#d24d0a] text-white">
      {/* Newsletter Section */}
      <div className="bg-gray-900 py-10 px-6 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">
            Subscribe to our Newsletter
          </h2>
          <p className="text-gray-300 mb-6">
            Get the latest updates on new products, discounts, and more straight
            to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-2/3 px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <button
              type="submit"
              className="bg-[#d24d0a] hover:bg-orange-700 px-6 py-3 rounded-lg text-white font-semibold transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">Wearehfg</h2>
          <p className="mt-3 text-sm text-gray-100">
            We are HUNGRY FOR GOD, a faith-driven clothing and accessories brand
            dedicated to inspiring lives and spreading the message of God
            through meaningful fashion.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/home"
                className="hover:underline flex items-center gap-1 "
              >
                <span className="p-2 bg-white/20 rounded-full hover:bg-white/30">
                  <GoHomeFill className="text-sm" />
                </span>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="hover:underline flex items-center gap-1 "
              >
                <span className="p-2 bg-white/20 rounded-full hover:bg-white/30">
                  <RiShoppingBag4Fill className="text-sm" />
                </span>
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:underline flex items-center gap-1 "
              >
                <span className="p-2 bg-white/20 rounded-full hover:bg-white/30">
                  <FaUsers className="text-sm" />
                </span>
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:underline flex items-center gap-1 "
              >
                <span className="p-2 bg-white/20 rounded-full hover:bg-white/30">
                  <MdContactPhone className="text-sm" />
                </span>
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/Cart"
                className="hover:underline flex items-center gap-1 "
              >
                <span className="p-2 bg-white/20 rounded-full hover:bg-white/30">
                  <MdShoppingCart className="text-sm" />
                </span>
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="hover:underline flex items-center gap-1 "
              >
                <span className="p-2 bg-white/20 rounded-full hover:bg-white/30">
                  <FaQuestion className="text-sm" />
                </span>
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacts*/}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="mailto:info@wearehfg.com?subject=Customer%20Inquiry&body=Hello,%20I%20need%20help%20with..."
                className="hover:underline  flex items-center gap-1 "
              >
                <span className="p-2 bg-white/20 rounded-full hover:bg-white/30">
                  <MdAttachEmail className="text-sm" />
                </span>
                info@wearehfg.com
              </a>
            </li>
            <li>
              <a
                href="tel:754-271-6107"
                className="hover:underline flex items-center gap-1"
              >
                <span className="p-2 bg-white/20 rounded-full hover:bg-white/30 text-sm">
                  <MdAddIcCall className="text-sm" />
                </span>
                754-271-6107
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              target="_blank"
              className="p-2 bg-white/20 rounded-full hover:bg-white/30"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              target="_blank"
              className="p-2 bg-white/20 rounded-full hover:bg-white/30"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              target="_blank"
              className="p-2 bg-white/20 rounded-full hover:bg-white/30"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              target="_blank"
              className="p-2 bg-white/20 rounded-full hover:bg-white/30"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-[#c13f05] py-4 text-center text-sm">
        © {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
