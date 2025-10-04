import React, { useEffect, useState } from "react";
import { BsEnvelopeAtFill } from "react-icons/bs";
import { FaFacebook, FaUser, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTikTok } from "react-icons/ai";
import { HiMenuAlt3, HiShoppingCart, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";
import { Space, Dropdown } from "antd";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { images } from "../constants/Images";
import { useAuthContext } from "../context/useAuthContext";

const Navbarr: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false); // for mobile account accordion
  // Get wishlist items from Redux
  const wishlistCount = useSelector(
    (state: RootState) => state.wishlist.items.length
  );
  // Get cart items from Redux
  const cartCount = useSelector((state: RootState) => state.cart.items.length);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { authToken, setAuthToken, setEmail, setName, setUserId } =
    useAuthContext();
  const token = authToken || sessionStorage.getItem("authToken");

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("email");
    setName(null);
    setUserId(null);
    setEmail(null);
    setAuthToken(null); // clear from context too
    window.location.href = "/auth/login"; // redirect to login
  };
  const accountItems: MenuProps["items"] = token
    ? [
        {
          key: "1",
          label: (
            <button onClick={handleLogout} className="w-full text-left">
              Logout
            </button>
          ),
        },
      ]
    : [
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
  // Prospect dropdown items
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link to="/prayer" onClick={() => setMenuOpen(false)}>
          Prayer Request
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <a
          onClick={() => setMenuOpen(false)}
          target="_blank"
          href="https://www.zeffy.com/en-US/donation-form/1fd1cbc8-095d-41a9-9849-d5cc84958f5f"
        >
          Donation
        </a>
      ),
    },
    {
      key: "7",
      label: (
        <Link to="/gallary" onClick={() => setMenuOpen(false)}>
          Gallary
        </Link>
      ),
    },

    {
      key: "3",
      label: (
        <Link to="/testimony" onClick={() => setMenuOpen(false)}>
          Testimony
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <a
          target="_blank"
          href="https://form.jotform.com/251816494006154"
          onClick={() => setMenuOpen(false)}
        >
          Mass Evangelism
        </a>
      ),
    },
    {
      key: "5",
      label: (
        <a
          onClick={() => setMenuOpen(false)}
          target="_blank"
          href="https://www.eventbrite.com/e/brainy-bites-book-club-september-2025-tickets-1550094266679?aff=ebdsshcopyurl&utm-source=cp&utm-term=listing&utm-campaign=social&utm-medium=discovery&utm-content=attendeeshare"
        >
          Book Club
        </a>
      ),
    },
    {
      key: "6",
      label: (
        <Link to="/salvation" onClick={() => setMenuOpen(false)}>
          Salvation
        </Link>
      ),
    },
  ];

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
              <a
                href="https://www.facebook.com/hungryyyyyyyyyyyyyyyforGOD?mibextid=rS40aB7S9Ucbxw6v"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="hover:text-[#d24d0a] text-lg transition duration-700 ease-in-out" />
              </a>
              <a
                href="https://www.instagram.com/wearehfg?igsh=b2FtMWNncWVlMzJp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiInstagramFill className="hover:text-[#d24d0a] text-lg transition duration-700 ease-in-out" />
              </a>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <AiFillTikTok className="hover:text-[#d24d0a] text-lg transition duration-700 ease-in-out" />
              </a>
              <a
                href="https://m.youtube.com/@hungryforgod"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="hover:text-[#d24d0a] text-lg transition duration-700 ease-in-out" />
              </a>
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
        <div className="max-w-7xl mx-auto flex items-center justify-between p-2 ">
          {/* Logo */}
          <img
            src={images.mainLogo}
            alt="Hunger For God Logo"
            className="h-16 md:h-20 w-auto object-contain"
          />
          {/* <h1 className="text-[#dce0ee] text-xl font-bold">MyLogo</h1> */}

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
            {/* Cart (desktop) */}
            <Link
              to="/shop/cart"
              className="relative hover:text-[#dce0ee] cursor-pointer flex items-center gap-1"
            >
              Cart <HiShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg border-2 border-orange-800">
                  {cartCount}
                </span>
              )}
            </Link>
            {/* Wishlist (desktop) */}
            <Link
              to="/shop/favorites"
              className="relative hover:text-[#dce0ee] cursor-pointer flex items-center gap-1"
            >
              <FaHeart className="text-white text-xl" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg border-2 border-orange-800">
                  {wishlistCount}
                </span>
              )}
            </Link>
            {/* Account dropdown (desktop) */}
            <Dropdown menu={{ items: accountItems }} trigger={["click"]}>
              <button className="cursor-pointer px-3 py-2 rounded-lg border border-[#FF6200] hover:border-[#d24d0a] bg-[#d24d0a] text-white hover:bg-[#FF6200] flex items-center gap-2">
                Account <FaUser />
              </button>
            </Dropdown>
          </div>

          {/* Mobile: Cart + Wishlist + Hamburger */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Cart (mobile) */}
            <Link
              to="/shop/cart"
              className="relative text-white flex items-center gap-1"
            >
              <HiShoppingCart className="text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Wishlist (mobile) */}
            <Link
              to="/shop/favorites"
              className="relative text-white flex items-center gap-1"
            >
              <FaHeart className="text-2xl" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="text-white text-2xl focus:outline-none"
            >
              <HiMenuAlt3 />
            </button>
          </div>
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
          <img
            src={images.mainLogo}
            alt="Hunger For God Logo"
            className="h-16 md:h-20 w-auto object-contain"
          />
          {/* <h1 className="text-xl font-bold text-gray-800">MyLogo</h1> */}
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
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#d24d0a] block"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#d24d0a] block"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/about-us"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#d24d0a] block"
            >
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
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#d24d0a] block"
            >
              Contact
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
              {token ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="block text-left w-full text-black hover:text-[#d24d0a]"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
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
                </>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbarr;
