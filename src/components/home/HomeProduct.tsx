import React from "react";
import { FaHeart, FaEye, FaLongArrowAltRight } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../assets/hook/hook";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../features/wishlist/wishlistSlice";
import { addToCart, removeFromCart } from "../../features/cart/CartSlice";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa6";
import api from "../../assets/api/axios/axios";
import type { itemProps, ProductCardProps, ProductProps } from "../../dataType/DataType";

// ✅ Dummy Data
const localProducts: ProductCardProps[] = [
  {
    id: 1,
    name: "Luxury Skincare Cream",
    price: "29.99",
    image: "https://i.pravatar.cc/300?img=1",
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
    price: "39.99",
    image: "https://i.pravatar.cc/300?img=3",
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
    price: "24.99",
    image: "https://i.pravatar.cc/300?img=6",
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
    price: "49.99",
    image: "https://i.pravatar.cc/300?img=7",
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
    price: "59.99",
    image: "https://i.pravatar.cc/300?img=8",
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
    const res = await api.get("/todayDealProducts.php?limit=8&offset=0");
    const data = Array.isArray(res.data.message)
      ? res.data.message
      : (res.data.message ?? []);
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
    return localProducts;
  }
};

// -------------------- Deal Item --------------------
const DealItem: React.FC<{
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

  const isInWishlist = wishlist.some((item) => item.id === id);
  const isInCart = cart.some((item) => item.id === id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(id));
      toast.error(`${name} removed from wishlist`, { autoClose: 1500 });
    } else {
      dispatch(
        addToWishlist({
          id,
          name,
          price: parseFloat(price.replace("$", "")),
          image,
          quantity: 1,
        })
      );
      toast.success(`${name} added to wishlist`, { autoClose: 1500 });
    }
  };

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
      <div className="relative overflow-hidden rounded-2xl shadow-lg backdrop-blur-md bg-white/10 border-b border-white/20 transition-shadow duration-300 p-2 group">
        {/* Image */}
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

      {/* Mobile icons */}
      <div className="flex justify-center mt-3 space-x-4 md:hidden">
        <button
          onClick={handleWishlistToggle}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer"
        >
          <FaHeart className={isInWishlist ? "text-red-900" : "text-red-500"} />
        </button>
        <button
          onClick={handleCartToggle}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer"
        >
          <HiShoppingCart
            className={isInCart ? "text-green-900" : "text-green-500"}
          />
        </button>
        <button
          onClick={() => navigate(`/shop/product-details/${id}`)}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer"
        >
          <FaEye className="text-blue-600" />
        </button>
      </div>

      {/* Info */}
      <div className="text-center mt-3">
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-gray-50 font-bold">{price}</p>
      </div>
    </div>
  );
};

// -------------------- Today's Deal --------------------
const HomeProduct: React.FC = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<ProductProps[], Error>({
    queryKey: ["products", 8],
    queryFn: () => fetchProducts(),
    retry: 1,
  });

  const finalProducts = isError ? localProducts : (products ?? localProducts);

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="px-2 py-3 font-bold text-sm md:text-xl text-gray-50">
          Today's Deal
        </p>
        <Link to="/shop/all-shop">
          <button className="px-4 py-2 bg-[#FF6200] text-white rounded-lg hover:bg-[#d24d0a] transition flex items-center gap-2 text-sm md:text-[16px]">
            All Collections <FaLongArrowAltRight />
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full bg-transparent">
        {isLoading ? (
          <div className="flex items-center justify-center h-64 col-span-full">
            <FaSpinner className="animate-spin text-4xl text-orange-400" />
          </div>
        ) : (
          finalProducts.map((p: ProductCardProps) => <DealItem key={p.id} {...p} />)
        )}
      </div>
    </>
  );
};

export default HomeProduct;
