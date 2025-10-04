import React, { useEffect, useState } from "react";
// import { FaRegHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import RelatedProduct from "./RelatedProduct";
import { MdShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../assets/hook/hook";
import { addToCart } from "../features/cart/CartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import api from "../assets/api/axios/axios";
import type { productDetailsTypes } from "../dataType/DataType";
import { FaHeart } from "react-icons/fa6";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<string>();
  const productId = Number(id);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [productDetails, setProductDetails] = useState<
    productDetailsTypes | undefined
  >();
  const [activeTab, setActiveTab] = useState<"description" | "information">(
    "description"
  );

  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlist.some((item) => item.id === productId);

  const tabItems = [
    { key: "description", label: "Description" },
    { key: "information", label: "Information" },
  ] as const;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]); // runs whenever product changes

  // ✅ Fetch single productDetails
  useEffect(() => {
const fetchProductById = async (id: number): Promise<productDetailsTypes> => {
  try {
    const res = await api.get(`/products.php/${id}`);
    const item = res.data.message[0]; // since PHP wraps in `message: []`

    return {
      id: parseInt(item.product_id),
      name: item.product_name,
      price: parseFloat(item.product_price),
      description: item.product_description,
      availability: item.availability,
      weight: item.weights?.[0] ?? "N/A", // pick first weight or "N/A"
      shipping: item.shipping || "free shipping", // if not in DB, keep static
      sizes: item.sizes || [],
      colors: item.colors || [],
      images: item.product_images || [],
      tabs: {
        description: item.product_description
          ? [item.product_description]
          : ["No description available"],
        information: item.product_information
          ? [item.product_information]
          : ["No info available"],
      },
    };
  } catch (err) {
    console.error("API failed, using dummy data:", err);

    return {
      id,
      name: "Stylish Hoodies",
      price: 59.99,
      availability: "In Stock",
      weight: "0.5kg",
      shipping: "Free Shipping",
      description:
        "This hoodie is made from high-quality cotton blend fabric Perfect for casual wear and outdoor activities",
      sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
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
      images: [
        "https://i.pravatar.cc/600?img=8",
        "https://i.pravatar.cc/600?img=7",
        "https://i.pravatar.cc/600?img=9",
        "https://i.pravatar.cc/600?img=10",
      ],
      tabs: {
        description: [
          "This hoodie is made from high-quality cotton blend fabric.",
          "Perfect for casual wear and outdoor activities.",
        ],
        information: [
          "Material: 100% Cotton",
          "Care: Machine wash cold",
          "Origin: Made in Italy",
        ],
      },
    };
  }
};


    if (id) {
      fetchProductById(productId).then((productDetails) => {
        // ✅ set state here
        setProductDetails(productDetails);
        console.log(productDetails);
      });
    }
  }, [productId, id]);

  const handleAddToCart = () => {
    if (!productDetails) return; // ✅ ensures it's defined
    if (!selectedSize || !selectedColor) {
      Swal.fire({
        title: "Oops",
        text: "Please select a color and size before adding to cart!",
        icon: "warning",
      });
      return;
    }
    dispatch(
      addToCart({
        id: productDetails.id,
        name: productDetails.name,
        price: productDetails.price,
        image: productDetails.images[0],
        selectedSize: selectedSize,
        selectedColor: selectedColor,
        quantity,
        availableSizes: productDetails.sizes,
        availableColors: productDetails.colors,
      })
    );
    toast.success(`${productDetails.name} added to cart`, {
      autoClose: 1500,
    });
  };

  const handleWishlistToggle = () => {
    if (!productDetails) return; // ✅ prevent undefined

    if (isInWishlist) {
      dispatch(removeFromWishlist(productDetails.id));
      toast.error(`${productDetails.name} removed from wishlist`, {
        autoClose: 1500,
      });
    } else {
      dispatch(
        addToWishlist({
          id: productDetails.id,
          name: productDetails.name,
          price: productDetails.price,
          image: productDetails.images[0],
          quantity: 1, // only if your type needs it
        })
      );
      toast.success(`${productDetails.name} added to wishlist`, {
        autoClose: 1500,
      });
    }
  };

  if (!productDetails) {
    return (
      <div className="animate-pulse p-6 space-y-6">
        {/* Image Skeleton */}
        <div className="w-full h-80 bg-gray-300 rounded-xl"></div>

        {/* Title */}
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>

        {/* Description lines */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>

        {/* Price */}
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>

        {/* Buttons */}
        <div className="flex space-x-4 pt-4">
          <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
          <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left: Product Images */}
        <div className="flex flex-col">
          {/* Main Image */}
          <div className="w-full aspect-square bg-white rounded-2xl shadow-lg flex items-center justify-center overflow-hidden">
            <img
              src={productDetails.images[0]}
              alt={productDetails.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Thumbnail Slider */}
          <div className="mt-4">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
              {productDetails.images.slice(1).map((img, index) => (
                <div
                  key={index}
                  className="w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden snap-center"
                >
                  <img
                    src={img}
                    alt="Thumbnail"
                    className="w-full h-full object-cover cursor-pointer hover:ring-2 hover:ring-orange-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold mb-2">{productDetails.name}</h2>
          <p className="text-2xl font-semibold text-orange-400 mb-4">
            ${productDetails.price}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {productDetails.description}
          </p>

          {/* Size Selector */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Select Size:</h4>
            <div className="flex flex-wrap gap-3">
              {productDetails.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-xl text-sm md:text-base transition ${
                    selectedSize === size
                      ? "bg-orange-600 text-white border-orange-700"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Select Color:</h4>
            <div className="flex flex-wrap gap-3">
              {productDetails.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-xl text-sm md:text-base transition ${
                    selectedColor === color
                      ? "bg-orange-600 text-white border-orange-700"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6 flex items-center gap-4">
            <h4 className="font-semibold">Quantity:</h4>
            <div className="flex items-center border rounded-xl">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1 border-r hover:bg-gray-700 rounded-xl"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-3 py-1 border-l hover:bg-gray-700 rounded-xl"
              >
                +
              </button>
            </div>
            <div
              onClick={handleWishlistToggle}
              className="bg-white rounded-xl flex px-3 py-3 text-gray-700 hover:bg-orange-200 cursor-pointer"
            >
              <FaHeart
                className={`${isInWishlist ? "text-orange-900 " : "text-orange-500"}`}
              />
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="bg-orange-600 text-white px-6 py-3 rounded-2xl hover:bg-orange-700 transition flex items-center justify-center gap-2"
          >
            Add to Cart <MdShoppingCart size={24} />
          </button>

          {/* More Details for the Product */}
          <div className="py-10 mt-8">
            <hr className="border-t border-orange-900 rounded-full mb-8" />

            <div className="space-y-6">
              {/* Availability */}
              <div className="flex justify-between items-center bg-orange-100 p-4 rounded-xl shadow-sm">
                <p className="text-gray-900  font-medium">Availability:</p>
                <span
                  className={`${productDetails.availability === "in stock" ? "text-green-600 font-semibold" : "text-red-500 font-semibold"} `}
                >
                  {productDetails.availability}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between items-center bg-orange-100 p-4 rounded-xl shadow-sm">
                <p className="text-gray-900  font-medium">Shipping:</p>
                <span className="text-gray-700 ">
                  {productDetails.shipping}
                </span>
              </div>

              {/* Weight */}
              <div className="flex justify-between items-center bg-orange-100 p-4 rounded-xl shadow-sm">
                <p className="text-gray-900 font-medium">Weight:</p>
                <span className="text-orange-400">{productDetails.weight}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* productDetails information tabs */}
      <div className="">
        <div className="w-full mt-12">
          {/* Tab Header */}
          <div className="relative flex items-center justify-center">
            <div className="text-gray-50 px-6 flex gap-6 relative z-10">
              {tabItems.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`pb-1 text-sm sm:text-base font-medium transition ${
                    activeTab === tab.key
                      ? "text-orange-300 border-b-2 border-orange-400"
                      : "text-white hover:text-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-8 text-white py-7 px-2 backdrop-blur-md bg-white/30 border-b border-white/20 transition-shadow duration-300 p-2 rounded-xl">
            {activeTab === "description" && (
              <div className="space-y-2">
                {productDetails.tabs.description.map((descrpt, i) => (
                  <p key={i} className="text-gray-300">
                    {descrpt}
                  </p>
                ))}
              </div>
            )}

            {activeTab === "information" && (
              <ul className="list-disc list-inside space-y-2">
                {productDetails.tabs.information.map((info, i) => (
                  <li key={i} className="text-gray-300">
                    {info}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        {/* <h3 className="text-lg md:text-2xl font-bold mb-6">Related Products</h3> */}
        <div className="">
          <RelatedProduct productId={productDetails.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
