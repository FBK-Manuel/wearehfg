import React from "react";
import { Link } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";

import type {
  gridProps,
  GridShowcaseProps,
  productGridProps,
  
} from "../dataType/DataType";
import api from "../assets/api/axios/axios";

// -------------------
// Local Fallback Data
// -------------------
const localData = {
  bestSelling: [
    {
      id: 1,
      name: "Luxury Skincare Cream",
      price: "$29.99",
      image: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: 2,
      name: "Organic Face Oil",
      price: "$39.99",
      image: "https://i.pravatar.cc/100?img=2",
    },
    {
      id: 3,
      name: "Natural Body Lotion",
      price: "$24.99",
      image: "https://i.pravatar.cc/100?img=3",
    },
  ],
  topRated: [
    {
      id: 4,
      name: "Perfume Bottle",
      price: "$49.99",
      image: "https://i.pravatar.cc/100?img=4",
    },
    {
      id: 5,
      name: "Makeup Essentials",
      price: "$59.99",
      image: "https://i.pravatar.cc/100?img=5",
    },
    {
      id: 6,
      name: "Vitamin Serum",
      price: "$45.00",
      image: "https://i.pravatar.cc/100?img=6",
    },
  ],
  newArrival: [
    {
      id: 7,
      name: "Hydrating Mask",
      price: "$19.99",
      image: "https://i.pravatar.cc/100?img=7",
    },
    {
      id: 8,
      name: "Glow Cleanser",
      price: "$34.99",
      image: "https://i.pravatar.cc/100?img=8",
    },
    {
      id: 9,
      name: "Soothing Toner",
      price: "$22.00",
      image: "https://i.pravatar.cc/100?img=9",
    },
  ],
};

// -------------------
// API Fetcher (your pattern)
// -------------------
const fetchProducts = async (
  category: keyof typeof localData,
  limit: number = 3
): Promise<productGridProps[]> => {
  try {
    const res = await api.get(`/productGrid.php`, {
      params: { section: category, limit },
    });

    if (!res.data.success || !Array.isArray(res.data.message)) {
      throw new Error("Invalid response format");
    }

    return res.data.message.map((item: gridProps) => ({
      id: item.id,
      name: item.title,
      price: `$${item.price}`,
      image: item.image,
    }));
  } catch (error) {
    console.warn(`❌ API failed for ${category}, using local fallback`, error);
    return localData[category] || [];
  }
};


// -------------------
// Component
// -------------------
const GridShowcase: React.FC<GridShowcaseProps> = () => {
  const { data: bestSelling = [], isLoading: loadingBest } = useQuery<
    productGridProps[]
  >({
    queryKey: ["bestSelling"],
    queryFn: () => fetchProducts("bestSelling"),
    retry: false, // 👈 stop retrying
  });

  const { data: topRated = [], isLoading: loadingTop } = useQuery<
     productGridProps[]
  >({
    queryKey: ["topRated"],
    queryFn: () => fetchProducts("topRated"),
    retry: false,
  });

  const { data: newArrival = [], isLoading: loadingNew } = useQuery<
     productGridProps[]
  >({
    queryKey: ["newArrival"],
    queryFn: () => fetchProducts("newArrival"),
    retry: false,
  });

  const gridSections = [
    { title: "Best Selling", products: bestSelling, loading: loadingBest },
    { title: "Top Rated", products: topRated, loading: loadingTop },
    { title: "New Arrival", products: newArrival, loading: loadingNew },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 mb-7">
      {gridSections.map((section, index) => (
        <div
          key={index}
          className="rounded-2xl shadow-lg p-4 backdrop-blur-md bg-white/10 border-b border-white/20"
        >
          <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>

          {section.loading ? (
            <div className="flex justify-center py-6">
              <ImSpinner9 className="animate-spin text-white text-2xl" />
            </div>
          ) : section.products && section.products.length > 0 ? (
            section.products.map((product) => (
              <Link
                to={`/shop/product-details/${product.id}`}
                key={product.id}
                className="flex items-center mb-4 last:mb-0 hover:bg-white/5 p-2 rounded-lg transition"
              >
                {/* Image */}
                <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden backdrop-blur-md bg-white/10 border border-white/20">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                {/* Name & Price */}
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">
                    {product.name}
                  </h3>
                  <p className="text-gray-200 font-bold">{product.price}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-300 italic">No product found</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default GridShowcase;
