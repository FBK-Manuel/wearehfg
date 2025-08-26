import React, { useEffect, useState } from "react";
import { BsEnvelopeAtFill } from "react-icons/bs";
import { FaFacebook, FaUser } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTikTok } from "react-icons/ai";
import { HiMenuAlt3, HiShoppingCart, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";
import { Space, Dropdown } from "antd";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

// Prospect dropdown items
const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link to="/prayer">Prayer Request</Link>,
  },
  {
    key: "2",
    label: <Link to="/donation">Donation</Link>,
  },
  {
    key: "7",
    label: <Link to="/donation">Gallary</Link>,
  },

  {
    key: "3",
    label: <Link to="/testimony">Testimony</Link>,
  },
  {
    key: "4",
    label: <Link to="/evangelism">Mass Evangelism</Link>,
  },
  {
    key: "5",
    label: <Link to="/bookclub">Book Club</Link>,
  },
  {
    key: "6",
    label: <Link to="/salvation">Salvation</Link>,
  },
];

// Account dropdown items (desktop)
const accountItems: MenuProps["items"] = [
  {
    key: "1",
    label: <Link to="/auth/login">Login</Link>,
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: <Link to="/auth/register">Register</Link>,
  },
];

const Navbarr: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false); // for mobile account accordion

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Top Bar (visible only on md+ screens) */}
      <div className="hidden md:flex w-full bg-gray-200 text-gray-700 px-10 py-2 justify-between items-center">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <p className="font-light text-sm flex justify-center items-center gap-1.5">
            <BsEnvelopeAtFill /> info@wearehfg.com
          </p>
          <span>|</span>
          <p className="font-medium text-sm">
            Welcome to HUNGRY FOR GOD – Where Your Faith Inspires the World
          </p>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-light">Follow us:</p> <span>|</span>
            <p className="flex justify-center items-center gap-1.5">
              <FaFacebook className="hover:text-[#d24d0a] text-lg" />
              <RiInstagramFill className="hover:text-[#d24d0a] text-lg" />
              <AiFillTikTok className="hover:text-[#d24d0a] text-lg" />
            </p>
          </div>

          <div>
            <select className="p-1 rounded-md border-2">
              <option value="USD">USD ($)</option>
              <option value="NGN">NGN (₦)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav
        className={`sticky top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20 transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <h1 className="text-[#dce0ee] text-xl font-bold">MyLogo</h1>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 text-white items-center">
            <Link to="/" className="hover:text-[#dce0ee] cursor-pointer">
              Home
            </Link>
            <Link to="/shop" className="hover:text-[#dce0ee] cursor-pointer">
              Shop
            </Link>
            <Link
              to="/about-us"
              className="hover:text-[#dce0ee] cursor-pointer"
            >
              About
            </Link>
            {/* Prospect dropdown */}
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              className="cursor-pointer"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Prospect
                  <MdKeyboardArrowDown />
                </Space>
              </a>
            </Dropdown>
            <Link to="/contact" className="hover:text-[#dce0ee] cursor-pointer">
              Contact
            </Link>
            <Link
              to="/cart"
              className="hover:text-[#dce0ee] cursor-pointer flex items-center gap-1"
            >
              Cart <HiShoppingCart />
            </Link>
            {/* Account dropdown (desktop) */}
            <Dropdown menu={{ items: accountItems }} trigger={["click"]}>
              <button className="cursor-pointer px-3 py-2 rounded-lg border border-white bg-[#d24d0a] text-white hover:bg-orange-800 flex items-center gap-2">
                Account <FaUser />
              </button>
            </Dropdown>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white text-2xl focus:outline-none"
          >
            <HiMenuAlt3 />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#dce0ee] rounded-b-3xl rounded-tl-3xl z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">MyLogo</h1>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-gray-700"
          >
            <HiX />
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="flex flex-col space-y-4 p-4 text-gray-800 flex-1">
          <li>
            <Link to="/" className="hover:text-[#d24d0a] block">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-[#d24d0a] block">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/about-us" className="hover:text-[#d24d0a] block">
              About
            </Link>
          </li>
          <li>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a
                onClick={(e) => e.preventDefault()}
                className="hover:text-[#d24d0a] flex items-center cursor-pointer"
              >
                Prospect{" "}
                <MdKeyboardArrowDown
                  className={`${accountOpen ? "rotate-180" : ""} transition-transform`}
                />
              </a>
            </Dropdown>
          </li>
          <li>
            <Link to="/contact" className="hover:text-[#d24d0a] block">
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="hover:text-[#d24d0a] flex items-center gap-2"
            >
              Cart <HiShoppingCart />
            </Link>
          </li>
        </ul>

        {/* Account accordion (mobile) pinned to bottom */}
        <div className="p-4 border-t">
          <button
            onClick={() => setAccountOpen(!accountOpen)}
            className="w-full cursor-pointer px-3 py-2 rounded-lg border border-gray-300 bg-[#d24d0a] text-white flex justify-between items-center"
          >
            Account{" "}
            <MdKeyboardArrowUp
              className={`${accountOpen ? "rotate-180" : ""} transition-transform`}
            />
          </button>

          {accountOpen && (
            <ul className="ml-4 mt-2 space-y-2">
              <li>
                <Link
                  to="/auth/login"
                  className="block text-black hover:text-[#d24d0a]"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/register"
                  className="block text-black hover:text-[#d24d0a]"
                >
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbarr;
