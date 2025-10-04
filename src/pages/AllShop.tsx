import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaHeart,
  FaEye,
  FaChevronDown,
} from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { toast } from "react-toastify";
import { addToCart, removeFromCart } from "../features/cart/CartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "../assets/hook/hook";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import { IoTrashBinSharp } from "react-icons/io5";
import type { itemProps, ProductProps } from "../dataType/DataType";
import api from "../assets/api/axios/axios";
import { IoTrashBinSharp } from "react-icons/io5";
// ✅ Dummy Data
const localProducts: ProductProps[] = [
  {
    id: 1,
    name: "Luxury Skincare Cream",
    price: "29.99",
    image: "https://i.pravatar.cc/300?img=1",
    sizes: ["S", "M", "L"], // assume from backend later
    colors: [
      "Red",
      "Yellow",
      "Green",
      "Black",
      "White",
      "Pink",
      "Gray",
      "Navy",
      "Orange",
      "Maroon",
      "Gold",
    ],
    category: "T-Shirt",
  },
  {
    id: 2,
    name: "Organic Face Oil",
    price: "39.99",
    image: "https://i.pravatar.cc/300?img=3",
    sizes: ["S", "M", "L", "XL"], // assume from backend later
    colors: [
      "Red",
      "Yellow",
      "Green",
      "Black",
      "White",
      "Pink",
      "Gray",
      "Navy",
      "Orange",
      "Maroon",
      "Gold",
    ],
    category: "Hoodie",
  },
  {
    id: 3,
    name: "Natural Body Lotion",
    price: "24.99",
    image: "https://i.pravatar.cc/300?img=6",
    sizes: ["S", "M", "L", "XL", "3XL"], // assume from backend later
    colors: [
      "Yellow",
      "Green",
      "Black",
      "Red",
      // "White",
      "Pink",
      "Gray",
      "Navy",
      "Orange",
      "Maroon",
      "Gold",
    ],
    category: "Accessories",
  },
  {
    id: 4,
    name: "Perfume Bottle",
    price: "49.99",
    image: "https://i.pravatar.cc/300?img=7",
    sizes: ["M", "L", "XL", "2XL", "3XL"], // assume from backend later
    colors: [
      "Red",
      "Yellow",
      "Green",
      "Black",
      "White",
      // "Pink",
      "Gray",
      "Navy",
      "Orange",
      "Maroon",
      "Gold",
    ],
    category: "Kid Sets Unisex",
  },
  {
    id: 5,
    name: "Makeup Essentials",
    price: "59.99",
    image: "https://i.pravatar.cc/300?img=8",
    sizes: ["S", "M"], // assume from backend later
    colors: [
      "Red",
      "Yellow",
      "Green",
      "Black",
      "White",
      // "Pink",
      "Gray",
      "Navy",
      "Orange",
      "Maroon",
      "Gold",
    ],
    category: "Hoodie",
  },
];

const categories = [
  "All",
  "Hoodie",
  "T-Shirt",
  "Accessories",
  "Kid Sets Unisex",
];
const colors = [
  "Yellow",
  "Green",
  "Red",
  "Black",
  "White",
  "Pink",
  "Gray",
  "Navy",
  "Orange",
  "Maroon",
  "Gold",
];
const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];

// Fetcher with mapping — returns [] on unexpected response
const fetchProducts = async (): Promise<ProductProps[]> => {
  const res = await api.get("/products.php");
  console.log("RAW API response:", res.data); // 👀 check what the backend really sends

  const data = Array.isArray(res.data.message) ? res.data.message : [];
  console.log("Parsed data:", data);

  return data.map((item: itemProps) => {
    console.log("Mapping item:", item); // 👀 log each item
    return {
      id: Number(item.id),
      name: item.title,
      price: String(item.price ?? "0"),
      image: item.image ?? "",
      sizes: Array.isArray(item.sizes) ? item.sizes : sizes,
      colors: Array.isArray(item.colors) ? item.colors : colors,
      // ✅ FIX: normalize category (fallback + trim + lowercase handling later)
      category: (
        item.filter_category ||
        item.category ||
        "Uncategorized"
      ).toString(),
    };
  });
};





const AllShop: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  // const [priceRange, setPriceRange] = useState(100000);

  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  // Accordion open/close state
  const [openSections, setOpenSections] = useState<string[]>([
    "Category",
    "Price",
    "Color",
    "Size",
  ]);

  const productsPerPage = 9;
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const cart = useAppSelector((state) => state.cart.items);
  const navigate = useNavigate();

  // React Query
  const {
    data: products = localProducts,
    isLoading,
    // error,
  } = useQuery({
    queryKey: ["products"],

    queryFn: () => fetchProducts(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  // Toggle helpers
  const toggleSection = (section: string) =>
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );

  const toggleColor = (color: string) =>
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );

  const toggleSize = (size: string) =>
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );

  // ✅ Compute max price dynamically
  const maxPrice =
    products.length > 0
      ? Math.max(...products.map((p) => parseFloat(p.price)))
      : 100; // fallback if no products

  // ✅ State
  const [priceRange, setPriceRange] = useState(maxPrice);
  // ✅ Sync price range with products when they load
  useEffect(() => {
    if (products.length > 0) {
      const max = Math.max(...products.map((p) => parseFloat(p.price)));
      setPriceRange(max);
    }
  }, [products]);
  // 1. Filtering
  const filteredProducts = products
    .filter((p) => {
      // ✅ Category filter
      if (selectedCategory !== "All") {
        if (
          (p.category || "").toLowerCase() !== selectedCategory.toLowerCase()
        ) {
          return false;
        }
      }

      // ✅ Search filter (name match)
      if (search.trim() !== "") {
        if (!p.name.toLowerCase().includes(search.toLowerCase())) {
          return false;
        }
      }

      // ✅ Color filter
      if (selectedColors.length > 0) {
        const productColors = (p.colors || []).map((c) =>
          c.trim().toLowerCase()
        );

        const hasColor = selectedColors.some((c) =>
          productColors.includes(c.trim().toLowerCase())
        );

        if (!hasColor) return false;
      }



      // ✅ Size filter
      if (selectedSizes.length > 0) {
        const productSizes = (p.sizes || []).map((s) => s.toLowerCase());
        const hasSize = selectedSizes.some((s) =>
          productSizes.includes(s.toLowerCase())
        );
        if (!hasSize) return false;
      }

      // ✅ Price filter
      const productPrice = parseFloat(p.price);
      if (isNaN(productPrice) || productPrice > priceRange) {
        return false;
      }

      return true; // ✅ passes all filters
    })
    .sort((a, b) => {
      // 2. Sorting
      if (sortBy === "price-asc") {
        return parseFloat(a.price) - parseFloat(b.price);
      }
      if (sortBy === "price-desc") {
        return parseFloat(b.price) - parseFloat(a.price);
      }
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      return 0; // default
    });

  // Pagination
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / productsPerPage)
  );

  // Handlers for wishlist & cart (receive product)
  const handleWishlistToggle = (product: ProductProps) => {
    const isInWishlist = wishlist.some((w) => w.id === product.id);
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.error(`${product.name} removed from wishlist`, { autoClose: 1500 });
    } else {
      dispatch(
        addToWishlist({
          id: product.id,
          name: product.name,
          price: parseFloat(product.price),
          image: product.image,
          quantity: 1,
        })
      );
      toast.success(`${product.name} added to wishlist`, { autoClose: 1500 });
    }
  };

  const handleCartToggle = (product: ProductProps) => {
    const isInCart = cart.some((c) => c.id === product.id);
    if (isInCart) {
      dispatch(
        removeFromCart({
          id: product.id,
          selectedSize: product.sizes?.[0],
          selectedColor: product.colors?.[0],
        })
      );
      toast.error(`${product.name} removed from cart`, { autoClose: 1500 });
    } else {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: parseFloat(product.price),
          image: product.image,
          quantity: 1,
          selectedSize: product.sizes?.[0],
          selectedColor: product.colors?.[0],
          availableSizes: product.sizes ?? sizes,
          availableColors: product.colors ?? colors,
        })
      );
      toast.success(`${product.name} added to cart`, { autoClose: 1500 });
    }
  };

  // Filter sidebar JSX (keeps the exact toggle sections you had)
  const FilterSidebar = (
    <div className="w-72 backdrop-blur-md bg-black/10 border-b border-white/10 transition-shadow rounded-2xl shadow-lg p-6 overflow-y-auto h-full">
      <h3 className="text-xl font-bold mb-4 mt-10 md:mt-0">Product Filters</h3>

      {/* Category */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("Category")}
          className="w-full flex justify-between items-center font-semibold mb-2"
        >
          Category{" "}
          <FaChevronDown
            className={`transition-transform ${openSections.includes("Category") ? "rotate-180" : ""}`}
          />
        </button>
        {openSections.includes("Category") && (
          <div className="pl-2">
            {categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center mb-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                  className="mr-2"
                />
                {cat}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("Price")}
          className="w-full flex justify-between items-center font-semibold mb-2"
        >
          Price{" "}
          <FaChevronDown
            className={`transition-transform ${openSections.includes("Price") ? "rotate-180" : ""}`}
          />
        </button>
        {openSections.includes("Price") && (
          <div>
            <h4 className="mb-2">Up to ${priceRange}</h4>
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Color */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("Color")}
          className="w-full flex justify-between items-center font-semibold mb-2"
        >
          Color{" "}
          <FaChevronDown
            className={`transition-transform ${openSections.includes("Color") ? "rotate-180" : ""}`}
          />
        </button>
        {openSections.includes("Color") && (
          <div className="flex flex-wrap gap-3 pl-2">
            {colors.map((c) => (
              <label
                key={c}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={selectedColors.includes(c)}
                  onChange={() => toggleColor(c)}
                  className="hidden"
                />
                <span
                  className="w-6 h-6 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: c.toLowerCase() }}
                />
                <span>{c}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Size */}
      <div>
        <button
          onClick={() => toggleSection("Size")}
          className="w-full flex justify-between items-center font-semibold mb-2"
        >
          Size{" "}
          <FaChevronDown
            className={`transition-transform ${openSections.includes("Size") ? "rotate-180" : ""}`}
          />
        </button>
        {openSections.includes("Size") && (
          <div className="grid grid-cols-2 gap-3 pl-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => toggleSize(s)}
                className={`px-4 py-2 rounded-lg border ${
                  selectedSizes.includes(s)
                    ? "bg-[#782c06] text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // lazy loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row p-6 gap-6">
        {/* Sidebar skeleton (desktop) */}
        <aside className="hidden md:block md:w-1/4 mr-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-3/4 bg-gray-300 rounded-md" />
            <div className="space-y-3">
              <div className="h-6 bg-gray-300 rounded-md w-full" />
              <div className="h-40 bg-gray-300 rounded-md" />
              <div className="h-6 bg-gray-300 rounded-md w-2/3" />
              <div className="h-6 bg-gray-300 rounded-md w-1/2" />
            </div>
          </div>
        </aside>

        {/* Main content skeleton */}
        <main className="flex-1">
          {/* Top controls skeleton */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="h-12 w-full md:w-1/2 bg-gray-300 rounded-lg animate-pulse" />
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="h-12 w-40 bg-gray-300 rounded-lg animate-pulse" />
              <div className="h-12 w-12 bg-gray-300 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Products Grid skeleton: 9 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="relative group w-full bg-transparent animate-pulse"
              >
                <div className="overflow-hidden rounded-2xl shadow-lg z-50 backdrop-blur-md bg-white/5 border-b border-white/5 transition-shadow duration-300 p-2">
                  <div className="w-full h-64 bg-gray-300 rounded-xl" />
                  <div className="mt-3 h-4 bg-gray-300 rounded w-3/4" />
                  <div className="mt-2 h-4 bg-gray-300 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination skeleton */}
          <div className="flex justify-center mt-8 space-x-2 items-center">
            <div className="h-10 w-10 bg-gray-300 rounded-lg animate-pulse" />
            <div className="flex gap-2">
              <div className="h-10 w-10 bg-gray-300 rounded-lg animate-pulse" />
              <div className="h-10 w-10 bg-gray-300 rounded-lg animate-pulse" />
              <div className="h-10 w-10 bg-gray-300 rounded-lg animate-pulse" />
            </div>
            <div className="h-10 w-10 bg-gray-300 rounded-lg animate-pulse" />
          </div>
        </main>
      </div>
    );
  }

  // if (error)
  //   return (
  //     <p className="text-center text-white flex flex-col items-center justify-center space-y-3 py-3">
  //       <IoTrashBinSharp />
  //       Failed to load products
  //     </p>
  //   );

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-6">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block md:w-1/4 mr-6">{FilterSidebar}</aside>

      {/* Mobile Drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/80"
            onClick={() => setFilterOpen(false)}
          />
          {/* Drawer */}
          <div className="relative w-72 backdrop-blur-md bg-white/10 h-full shadow-xl transform transition-transform duration-300">
            <button
              className="absolute top-4 right-4 text-gray-600"
              onClick={() => setFilterOpen(false)}
            >
              <FaTimes size={20} />
            </button>
            {FilterSidebar}
          </div>
        </div>
      )}

      {/* Products Section */}
      <main className="flex-1">
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          {/* Search */}
          <div className="flex items-center rounded-lg px-3 py-2 w-full md:w-1/2 backdrop-blur-md bg-white/10 border-b border-white/20 h-full shadow-xl">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full focus:outline-none"
            />
          </div>

          {/* Sort + Filter Button */}
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="backdrop-blur-md bg-white/10 border-b border-white/20 h-full shadow-xl rounded-lg p-2 text-white"
            >
              <option value="default" className="bg-[#d24d0a] text-gray-500">
                Sort By
              </option>
              <option value="price-asc" className="bg-[#d24d0a] text-gray-200">
                Price (Low → High)
              </option>
              <option value="price-desc" className="bg-[#d24d0a] text-gray-200">
                Price (High → Low)
              </option>
            </select>

            {/* Mobile Filter Button */}
            <button
              className="md:hidden flex items-center bg-[#b03e06] text-white px-4 py-2 rounded-lg shadow hover:bg-[#d24d0a]"
              onClick={() => setFilterOpen(true)}
            >
              <FaFilter className="mr-2" /> Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {/* Products Grid */}
        {currentProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-gray-100">
            <IoTrashBinSharp className="text-4xl mb-3 text-white" />
            <p className="text-lg font-semibold">No products found</p>
            <p className="text-sm">Try adjusting your search by keywords</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product) => {
              const isInWishlist = wishlist.some((w) => w.id === product.id);
              const isInCart = cart.some((c) => c.id === product.id);

              return (
                <div
                  key={product.id}
                  className="relative group w-full bg-transparent"
                >
                  <div className="overflow-hidden rounded-2xl shadow-lg z-50 backdrop-blur-md bg-white/10 border-b border-white/20 transition-shadow duration-300 p-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-105 rounded-xl"
                    />

                    {/* Hover Actions */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleWishlistToggle(product)}
                          className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer"
                        >
                          <FaHeart
                            className={
                              isInWishlist ? "text-red-900" : "text-red-500"
                            }
                          />
                        </button>
                        <button
                          onClick={() => handleCartToggle(product)}
                          className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer"
                        >
                          <HiShoppingCart
                            className={
                              isInCart ? "text-green-900" : "text-green-500"
                            }
                          />
                        </button>
                        <button
                          onClick={() => {
                            navigate(`/shop/product-details/${product.id}`);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer"
                        >
                          <FaEye className="text-blue-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Mobile icons */}
                  <div className="flex justify-center mt-3 space-x-4 md:hidden">
                    <button
                      onClick={() => handleWishlistToggle(product)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer"
                    >
                      <FaHeart
                        className={
                          isInWishlist ? "text-red-900" : "text-red-500"
                        }
                      />
                    </button>
                    <button
                      onClick={() => handleCartToggle(product)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer"
                    >
                      <HiShoppingCart
                        className={
                          isInCart ? "text-green-900" : "text-green-500"
                        }
                      />
                    </button>
                    <button
                      onClick={() => {
                        navigate(`/shop/product-details/${product.id}`);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer"
                    >
                      <FaEye className="text-blue-600" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="text-center mt-3">
                    <h3 className="text-lg font-medium text-gray-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-50 font-bold">${product.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-2 items-center">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            ◀
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg shadow ${currentPage === i + 1 ? "bg-[#782c06] text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            ▶
          </button>
        </div>
      </main>
    </div>
  );
};

export default AllShop;
