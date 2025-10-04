import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaSpinner } from "react-icons/fa";
import { RiDeleteBin6Fill, RiDeleteBinFill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../assets/hook/hook";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/CartSlice";
import { toast } from "react-toastify";

const Wishlist: React.FC = () => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const [loading, setLoading] = useState(true);

  // 🔹 Simulate data loading (e.g. API or redux hydration)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400); // 0.8s loader
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = (id: number) => {
    dispatch(removeFromWishlist(id));
    toast.error("Removed from Wishlist ❌", { autoClose: 1500 });
  };

  const handleMoveToCart = (item: {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity?: number;
  }) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
    dispatch(removeFromWishlist(item.id));
    toast.success(`${item.name} moved to Cart 🛒`, { autoClose: 1500 });
  };

  // 🔹 Show spinner while loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-orange-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-lg md:text-2xl font-bold text-center text-gray-50 mb-8">
          My Favorites
        </h2>

        {wishlist.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-10 space-y-4">
            <RiDeleteBinFill className="text-gray-400 mt-2" size={30} />
            <p className="text-gray-100">Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="backdrop-blur-md bg-white/10 border-b border-white/20 transition-shadow duration-300 rounded-2xl shadow-md p-4 flex flex-col items-center text-center"
              >
                {/* Product Image */}
                <div className="backdrop-blur-md bg-white/40 border-b border-white/30 transition-shadow duration-300 rounded-xl w-fit flex items-center justify-center p-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-50 h-50 object-contain rounded-xl"
                  />
                </div>

                {/* Product Info */}
                <h3 className="mt-4 text-lg font-semibold text-gray-100">
                  {item.name}
                </h3>
                <p className="text-orange-300">${item.price.toFixed(2)}</p>

                {/* Actions */}
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  >
                    <RiDeleteBin6Fill size={18} />
                  </button>
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                  >
                    <FaShoppingCart size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
