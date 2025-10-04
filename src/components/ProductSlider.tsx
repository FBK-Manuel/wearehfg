import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaHeart, FaEye } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../assets/hook/hook";
import { useNavigate } from "react-router-dom";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import { toast } from "react-toastify";
import { addToCart, removeFromCart } from "../features/cart/CartSlice";
import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import type { itemProps, ProductCardProps } from "../dataType/DataType";
import { FaChevronLeft, FaChevronRight, FaSpinner } from "react-icons/fa6";
import type { NavigationOptions } from "swiper/types";
import api from "../assets/api/axios/axios";

// ✅ Dummy products (fallback)
const dummyProducts = [
  {
    id: 1,
    name: "Luxury Skincare Cream",
    price: "$29.99",
    image: "https://i.pravatar.cc/300?img=10",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"], // assume from backend later
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
  },
  {
    id: 2,
    name: "Organic Face Oil",
    price: "$39.99",
    image: "https://i.pravatar.cc/300?img=11",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"], // assume from backend later
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
  },
  {
    id: 3,
    name: "Natural Body Lotion",
    price: "$24.99",
    image: "https://i.pravatar.cc/300?img=12",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"], // assume from backend later
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
  },
  {
    id: 4,
    name: "Perfume Bottle",
    price: "$49.99",
    image: "https://i.pravatar.cc/300?img=13",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"], // assume from backend later
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
  },
  {
    id: 5,
    name: "Makeup Essentials",
    price: "$59.99",
    image: "https://i.pravatar.cc/300?img=14",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"], // assume from backend later
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
  },
  {
    id: 6,
    name: "Essential Oil Pack",
    price: "$25.00",
    image: "https://i.pravatar.cc/300?img=15",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"], // assume from backend later
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
  },
];

// ✅ Fetch function
const fetchProducts = async () => {
  try {
    const res = await api.get("/latestProducts.php?limit=10&offset=0");
    const data = Array.isArray(res.data.message) ? res.data.message : (res.data.message ?? []);
    return data.map((item: itemProps) => ({
      id: item.id,
      name: item.title,
      price: `$${item.price}`,
      image: item.image,
      sizes: item.sizes,
      colors: item.colors,
    }));
  } catch (error) {
    console.warn("API failed, using dummy products", error);
    return dummyProducts;
  }
};

const ProductCard: React.FC<{
  id: number;
  name: string;
  price: string;
  image: string;
  sizes: string[];
  colors: string[];
}> = ({ id, name, price, image, sizes, colors }) => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const cart = useAppSelector((state) => state.cart.items);
  const navigate = useNavigate();

  // ✅ Check if product is already in wishlist
  const isInWishlist = wishlist.some((item) => item.id === Number(id));

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(Number(id)));
      toast.error(`${name} removed from wishlist`, { autoClose: 1500 });
    } else {
      dispatch(
        addToWishlist({
          id: Number(id),
          name,
          price: parseFloat(price.replace("$", "")),
          image,
          quantity: 1,
        })
      );
      toast.success(`${name} added to wishlist`, { autoClose: 1500 });
    }
  };

  // ✅ Check if product is already in cart
  const isInCart = cart.some((item) => item.id === Number(id));

  const handleCartToggle = () => {
    if (isInCart) {
      dispatch(
        removeFromCart({ id, selectedSize: sizes[0], selectedColor: colors[0] })
      );
      toast.error(`${name} removed from cart`, { autoClose: 1500 });
    } else {
      dispatch(
        addToCart({
          id,
          name,
          price: parseFloat(price.replace("$", "")),
          image,
          quantity: 1,
          selectedSize: sizes[0], // ✅ default
          selectedColor: colors[0], // ✅ default
          availableSizes: sizes,
          availableColors: colors,
        })
      );
      toast.success(`${name} added to cart`, { autoClose: 1500 });
    }
  };

  return (
    <div className="relative group w-full bg-transparent">
      <div className="relative overflow-hidden rounded-2xl shadow-lg z-50 backdrop-blur-md bg-white/10 border-b border-white/20 transition-shadow duration-300 p-2 group">
        {/* Image Wrapper */}
        <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 relative">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105 rounded-xl"
          />
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex space-x-2">
            <button
              onClick={handleWishlistToggle}
              className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
            >
              <FaHeart
                className={`transform transition-transform duration-500 hover:rotate-[360deg] cursor-pointer ${
                  isInWishlist ? "text-red-900" : "text-red-500"
                }`}
              />
            </button>
            <button
              onClick={handleCartToggle}
              className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
            >
              <HiShoppingCart
                className={`transform transition-transform duration-500 hover:rotate-[360deg] cursor-pointer ${
                  isInCart ? "text-green-900" : "text-green-500"
                }`}
              />
            </button>
            <button
              onClick={() => navigate(`/shop/product-details/${id}`)}
              className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
            >
              <FaEye className="text-blue-600 transform transition-transform duration-500 hover:rotate-[360deg] cursor-pointer" />
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Icons below image for small screens */}
      <div className="flex justify-center mt-3 space-x-4 md:hidden">
        <button
          onClick={handleWishlistToggle}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <FaHeart
            className={`${isInWishlist ? "text-red-900" : "text-red-500"}`}
          />
        </button>
        <button
          onClick={handleCartToggle}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <HiShoppingCart
            className={`${isInCart ? "text-green-900" : "text-green-500"}`}
          />
        </button>
        <button
          onClick={() => navigate(`/shop/product-details/${id}`)}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <FaEye className="text-blue-600" />
        </button>
      </div>
      {/* Product Info */}
      <div className="text-center mt-3">
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-gray-50 font-bold">{price}</p>
      </div>
    </div>
  );
};

const ProductSlider: React.FC = () => {
  const { data: products = dummyProducts, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-orange-400" />
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <p className="px-2 py-3 flex items-center font-bold text-sm md:text-xl text-gray-50">
        Latest Collections
      </p>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        onInit={(swiper) => {
          const navigation = swiper.params.navigation as NavigationOptions;
          navigation.prevEl = prevRef.current;
          navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        spaceBetween={20}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((p: ProductCardProps) => (
          <SwiperSlide key={p.id}>
            <ProductCard {...p} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ Custom Buttons */}
      <button
        ref={prevRef}
        className="absolute top-1/2 left-2 z-10 -translate-y-1/2 p-3 bg-orange-500 rounded-full shadow hover:bg-orange-600 transition"
      >
        <FaChevronLeft className="text-white text-lg" />
      </button>
      <button
        ref={nextRef}
        className="absolute top-1/2 right-2 z-10 -translate-y-1/2 p-3 bg-orange-500 rounded-full shadow hover:bg-orange-600 transition"
      >
        <FaChevronRight className="text-white text-lg" />
      </button>
    </div>
  );
};

export default ProductSlider;
