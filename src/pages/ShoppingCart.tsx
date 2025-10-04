import React, { useEffect, useState } from "react";
import { FaLongArrowAltRight, FaOpencart, FaTimes } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../assets/hook/hook";
import {
  removeFromCart,
  clearCart,
  updateQuantity,
  addToCart,
} from "../features/cart/CartSlice";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "react-toastify";
import type { CartItems } from "../dataType/DataType"; // ✅ import CartItems type

const ShoppingCart: React.FC = () => {
  const cart = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const increaseQty = (item: CartItems) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      })
    );
  };

  const decreaseQty = (item: CartItems) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
        })
      );
    }
  };

  const removeItem = (item: CartItems) => {
    dispatch(
      removeFromCart({
        id: item.id,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      })
    );
    toast.error(`${item.name} removed from cart ❌`);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.error("All items removed from cart 🗑️");
  };

  const handleSizeChange = (item: CartItems, newSize: string) => {
    dispatch(
      removeFromCart({
        id: item.id,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      })
    );
    dispatch(
      addToCart({
        ...item,
        selectedSize: newSize,
      })
    );
    toast.info(`${item.name} size updated to ${newSize}`);
  };

  const handleColorChange = (item: CartItems, newColor: string) => {
    dispatch(
      removeFromCart({
        id: item.id,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      })
    );
    dispatch(
      addToCart({
        ...item,
        selectedColor: newColor,
      })
    );
    toast.info(`${item.name} color updated to ${newColor}`);
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-orange-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 flex flex-col items-center">
      <h2 className="text-lg md:text-2xl font-bold mb-6 text-center">
        Shopping Cart
      </h2>

      <div className="w-full max-w-6xl space-y-4">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
              className="relative flex flex-col md:flex-row md:items-center md:justify-between rounded-xl shadow-lg p-4 backdrop-blur-md bg-white/10 border border-white/20 transition duration-300"
            >
              {/* Remove button for small screen */}
              <button
                onClick={() => removeItem(item)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 md:hidden bg-black rounded-full px-1 py-1 hover:bg-gray-200"
              >
                <FaTimes />
              </button>

              {/* Product Info */}
              <div className="flex items-center space-x-4 w-full md:w-1/3 mb-3 md:mb-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex flex-col">
                  <h4 className="font-semibold text-gray-100 break-words">
                    {item.name}
                  </h4>
                  <p className="text-orange-400">${item.price}</p>
                  <div className="flex flex-col sm:flex-row sm:space-x-3 mt-2 text-sm">
                    {/* Size Dropdown */}
                    <select
                      value={item.selectedSize}
                      onChange={(e) => handleSizeChange(item, e.target.value)}
                      className="bg-transparent border border-white px-2 py-1 rounded-md focus:outline-none mb-2 sm:mb-0"
                    >
                      {(item.availableSizes ?? []).map((size) => (
                        <option
                          key={size}
                          value={size}
                          className="text-gray-200"
                        >
                          {size}
                        </option>
                      ))}
                    </select>

                    {/* Color Dropdown */}
                    <select
                      value={item.selectedColor}
                      onChange={(e) => handleColorChange(item, e.target.value)}
                      className="bg-transparent border border-white px-2 py-1 rounded-md focus:outline-none"
                    >
                      {(item.availableColors ?? []).map((color) => (
                        <option
                          key={color}
                          value={color}
                          className="text-gray-200"
                        >
                          {color}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Quantity + Total */}
              <div className="flex flex-row md:items-center w-full md:w-auto justify-between mb-3 md:mb-0 md:gap-30">
                <div className="flex items-center border rounded-xl overflow-hidden mb-2 md:mb-0 md:mr-4">
                  <button
                    onClick={() => decreaseQty(item)}
                    className="px-3 py-1 border-r hover:bg-gray-100 hover:text-gray-700"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item)}
                    className="px-3 py-1 border-l hover:bg-gray-100 hover:text-gray-700"
                  >
                    +
                  </button>
                </div>

                <div className="text-gray-200 font-semibold text-center md:text-right">
                  ${item.price * item.quantity}
                </div>
              </div>

              {/* Remove button for desktop */}
              <div className="hidden md:flex justify-end w-full md:w-1/6">
                <button
                  onClick={() => removeItem(item)}
                  className="text-red-500 hover:text-red-700 bg-black rounded-full px-1 py-1 hover:bg-gray-200"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-200 flex flex-col items-center justify-center gap-2 py-24 space-y-3">
            <RiDeleteBinFill size={30} />
            Your cart is empty
          </p>
        )}

        {cart.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
            <button
              onClick={() => {
                navigate("/shop/all-shop");
              }}
              className="flex items-center justify-center gap-2 w-full md:w-auto bg-orange-600 text-gray-200 px-6 py-2 rounded-lg hover:text-white hover:bg-orange-800 border-2 border-orange-500"
            >
              Continue Shopping <FaLongArrowAltRight />
            </button>
            <button
              onClick={handleClearCart}
              className="flex items-center justify-center gap-2 w-full md:w-auto bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
            >
              Clear Cart <FaOpencart />
            </button>
          </div>
        )}

        {cart.length > 0 && (
          <div className="backdrop-blur-md bg-white/10 border border-white/20 transition duration-300 rounded-xl shadow-lg p-6 mt-6 max-w-md w-full ml-auto">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              Order Summary
            </h3>
            <div className="flex justify-between mb-2 text-sm sm:text-base">
              <span className="text-gray-100">Subtotal</span>
              <span className="font-semibold">${totalAmount}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm sm:text-base">
              <span className="text-gray-100">Shipping</span>
              <span className="font-semibold">$10</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between mb-4 text-base sm:text-lg">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalAmount + 10}</span>
            </div>
            <button
              onClick={() => navigate("/shop/checkout")}
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
