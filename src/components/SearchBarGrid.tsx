import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaBars,
  FaPhoneAlt,
  FaSearch,
  FaShippingFast,
  FaTimes,
} from "react-icons/fa";
import { MdKeyboardArrowDown, MdOutlineSupportAgent } from "react-icons/md";
import { images } from "../constants/Images";
import { RiSecurePaymentFill, RiShoppingBag4Fill } from "react-icons/ri";
import { GiTrophyCup } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import api from "../assets/api/axios/axios";
import type { itemProps } from "../dataType/DataType";
import { FaSpinner } from "react-icons/fa6";
import { BiSolidTrash } from "react-icons/bi";
const SearchBarGrid: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // -------------------------------------------------------------------------
  const [category, setCategory] = useState("All Categories");
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Simulate data fetch (replace with your API call later)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds loading
    return () => clearTimeout(timer);
  }, []);

  // ✅ API fetch function (search by keyword & category)
  const fetchProducts = async (category: string, query: string) => {
    try {
      const res = await api.get(`/search.php`, {
        params: {
          category: category !== "All Categories" ? category : undefined,
          search: query?.trim() || undefined,
        },
      });
      return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      return [];
    }
  };

  // ✅ Debounce hook
  function useDebounce<T>(value: T, delay: number): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => setDebounced(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);

    return debounced;
  }

  const debouncedQuery = useDebounce(query, 500); // ✅ only send request after 500ms pause

  // ✅ React Query for fetching
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", category, debouncedQuery],
    queryFn: () => fetchProducts(category, debouncedQuery),
    enabled:
      isOpen && (debouncedQuery.length > 0 || category !== "All Categories"),
  });

  // ✅ Click outside to close results
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-3 md:px-6 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20 transition-shadow duration-300 rounded-t-2xl space-y-3 md:space-y-0">
        {/* Left: Button + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full md:w-auto space-y-3 sm:space-y-0">
          {/* Toggle Button (only on mobile) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex md:hidden items-center justify-center bg-[#d24d0a] hover:bg-[#FF6200] text-white px-4 py-2 rounded w-full sm:w-auto md:mb-0 mb-6"
          >
            <FaBars className="mr-2" /> All Departments{" "}
            <MdKeyboardArrowDown
              className={`text-white size-6 transition-transform duration-300 ${
                sidebarOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          <button className="md:flex hidden items-center justify-center bg-[#d24d0a] hover:bg-[#FF6200] text-white px-10 py-2 rounded w-full sm:w-auto md:mb-0 mb-6">
            <FaBars className="mr-2" /> All Departments{" "}
          </button>

          {/* Search Box */}
          <div className="relative w-full sm:w-auto" ref={containerRef}>
            {/* Search Box */}
            <form
              onSubmit={handleSearch}
              className="flex items-center border-gray-300 border-2 rounded-xl px-1 py-1"
            >
              {/* Category Select */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-2 py-2 text-sm border-r outline-none hidden sm:block "
              >
                <option className="text-gray-300">All Categories</option>
                <option className="text-black">T-Shirt</option>
                <option className="text-black">Hoodie</option>
                <option className="text-black">Kid Sets Unisex</option>
                <option className="text-black">Accessories</option>
              </select>

              {/* Search Input */}
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsOpen(true);
                }}
                placeholder="What do you need?"
                className="px-2 py-2 outline-none text-sm flex-grow sm:w-64"
              />

              {/* Search Button */}
              <button
                type="submit"
                className="p-3 bg-white/20 rounded-full cursor-pointer hover:bg-white/30"
              >
                <FaSearch />
              </button>
            </form>

            {/* Result Dropdown */}
            {isOpen && (
              <div className="absolute z-50 mt-2 w-full bg-gray-100 border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                {isLoading && (
                  <p className="p-4 text-gray-500 flex items-center justify-center text-center">
                    <FaSpinner className="animate-spin" />
                  </p>
                )}

                {/* No results */}
                {!isLoading && query.trim() && products.length === 0 && (
                  <p className="p-4 text-gray-500 flex flex-col items-center justify-center space-x-3 py-4">
                    <BiSolidTrash className="text-sm mb-1" />
                    No products found for "
                    <span className="font-semibold">{query}</span>"
                  </p>
                )}

                {/* Results */}
                {!isLoading &&
                  products.map((item: itemProps) => (
                    <div
                      key={item.id}
                      className="p-2 hover:bg-orange-600 cursor-pointer bg-gray-100 text-black"
                    >
                      <Link to={`/shop/product-details/${item.id}`}>
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div>
                            <p className="text-sm font-medium">{item.title}</p>
                            <p className="text-xs text-gray-700">
                              ${item.price}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Contact Info */}
        <div className="flex items-center justify-between sm:justify-end space-x-2 w-full md:w-auto">
          <div className="p-2 bg-white/20 rounded-full cursor-pointer hover:bg-white/30">
            <FaPhoneAlt className="text-white" />
          </div>
          <div className="text-left sm:text-right">
            <p className="font-bold text-sm sm:text-base md:text-lg">
              +65 11.188.888
            </p>
            <p className="text-xs text-gray-200">support 24/7 time</p>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside
          className={`
    shadow p-4 md:p-6 w-full md:w-64 backdrop-blur-md bg-black/30 border-b border-white/20
    ${sidebarOpen ? "block" : "hidden"} 
    md:block  /* always visible on md+ */
    absolute md:relative top-16 md:top-0 left-0 md:z-0
    `}
        >
          <h2 className="font-bold text-lg mb-4 mt-10 flex justify-between">
            All Departments
            <div className="flex justify-end md:hidden">
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white hover:text-red-400 text-xl"
              >
                <FaTimes />
              </button>
            </div>
          </h2>

          {/* Skeleton or Data */}
          {loading ? (
            <ul className="space-y-2 animate-pulse">
              {Array(8)
                .fill(null)
                .map((_, i) => (
                  <li key={i} className="h-4 bg-gray-300/30 rounded w-3/4"></li>
                ))}
            </ul>
          ) : (
            <ul className="space-y-2 text-gray-200">
              <li className="hover:text-[#FF6200] cursor-pointer">Clothing</li>
              <li className="hover:text-[#FF6200] cursor-pointer">Hoodie</li>
              <li className="hover:text-[#FF6200] cursor-pointer">T-Shirt</li>
              <li className="hover:text-[#FF6200] cursor-pointer">
                Sweat Shirt
              </li>
              <li className="hover:text-[#FF6200] cursor-pointer">
                Toddler Long Sleeve
              </li>
              <li className="hover:text-[#FF6200] cursor-pointer">
                Crew Neck Shirt
              </li>
              <li className="hover:text-[#FF6200] cursor-pointer">
                Kiss Cut Stickers
              </li>
              <li className="hover:text-[#FF6200] cursor-pointer">
                Basball Cap
              </li>
              <li className="hover:text-[#FF6200] cursor-pointer">Magic Mug</li>
              <li className="hover:text-[#FF6200] cursor-pointer">
                20oz Insulated Bottle
              </li>
              <li className="hover:text-[#FF6200] cursor-pointer">
                Winter Hat
              </li>
              <li className="hover:text-[#FF6200] cursor-pointer">
                Passport Cover
              </li>
              <li className="hover:text-[#FF6200] cursor-pointer">Car Mats</li>
              <li className="hover:text-[#FF6200] cursor-pointer">
                Bubble Free Stickers
              </li>
            </ul>
          )}
        </aside>

        {/* Hero Section */}
        <main className="flex-1 p-4 md:p-6 mt-16 md:mt-0">
          {loading ? (
            <div className="bg-gray-200 rounded-lg p-6 md:p-10 animate-pulse">
              <div className="h-6 bg-gray-400/50 w-32 mb-4 rounded"></div>
              <div className="h-10 bg-gray-400/50 w-48 mb-4 rounded"></div>
              <div className="h-4 bg-gray-400/50 w-64 mb-4 rounded"></div>
              <div className="h-10 bg-gray-400/50 w-28 mb-6 rounded"></div>
              <div className="w-full h-48 bg-gray-400/50 rounded"></div>
            </div>
          ) : (
            <div className="bg-gray-200 rounded-lg flex flex-col md:flex-row items-center justify-between p-6 md:p-10">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <p className="text-[#FF6200] font-bold uppercase">
                  Hungry for God
                </p>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">
                  Clothing That Inspires, <br className="hidden sm:block" />{" "}
                  Accessories That Shine.
                </h1>
                <p className="text-gray-500 mb-4">
                  Welcome to HUNGRY FOR GOD, <br /> where fashion meets faith!
                </p>
                <button
                  onClick={() => {
                    navigate("/shop/all-shop");
                  }}
                  className="bg-[#FF6200] text-white px-6 py-2 rounded hover:bg-[#d24d0a] flex items-center justify-center gap-2"
                >
                  Shop Now <RiShoppingBag4Fill />
                </button>
              </div>
              <div>
                <img
                  src={images.freepik}
                  alt="freepik"
                  className="w-64 sm:w-80 md:w-96 rounded mx-auto"
                />
              </div>
            </div>
          )}
        </main>
      </div>
      {/* for the fast delivery section */}
      <section>
        <div className="border border-white flex flex-col md:flex-row items-center justify-between text-white p-6 rounded-b-2xl mt-6 md:mt-0">
          <div className="flex flex-col items-center space-x-2">
            <FaShippingFast className="size-11 mb-2" />
            <p className="text-xl font-bold">Fast Shipping</p>
            <span className="text-xs">
              7-10 working days after order confirmation
            </span>
          </div>
          <div className="flex flex-col items-center space-x-2">
            <RiSecurePaymentFill className="size-11 mb-2" />
            <p className="text-xl font-bold">Secure Checkout</p>
            <span className="text-xs">Your money is safe</span>
          </div>
          <div className="flex flex-col items-center space-x-2">
            <GiTrophyCup className="size-11 mb-2" />
            <p className="text-xl font-bold">Quality Assurance</p>
            <span className="text-xs">100% money-back guarantee</span>
          </div>
          <div className="flex flex-col items-center space-x-2">
            <MdOutlineSupportAgent className="size-11 mb-2" />
            <p className="text-xl font-bold">Support 24/7</p>
            <span className="text-xs">Live contact/message</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchBarGrid;
