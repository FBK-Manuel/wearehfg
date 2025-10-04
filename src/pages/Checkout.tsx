import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { CheckoutFormValues } from "../dataType/DataType";
import { useAppSelector } from "../assets/hook/hook";

// ✅ Validation schema
const schema: yup.ObjectSchema<CheckoutFormValues> = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  addressLine1: yup.string().required("Address line 1 is required"),
  addressLine2: yup.string().optional(),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  postalCode: yup.string().required("Postal code is required"),
  country: yup.string().required("Country is required"),
  orderNote: yup.string().optional(),
  billingSameAsShipping: yup.boolean().required(),
  paymentMethod: yup
    .mixed<"googlepay" | "swipe" | "card">()
    .oneOf(["googlepay", "swipe", "card"])
    .required(),
});

const Checkout: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: yupResolver(schema),
  });

  // ✅ Get cart items from Redux
  const cart = useAppSelector((state) => state.cart.items);

  // ✅ Calculate totals
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = cart.length > 0 ? 10 : 0; // flat shipping for demo
  const total = subtotal + shipping;

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("Checkout data:", data);
    console.log("Cart:", cart);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-9xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Checkout Form */}
        <div className="backdrop-blur-md bg-white/20 border border-white/20 transition duration-300 shadow-lg rounded-2xl p-4">
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  {...register("firstName")}
                  placeholder="First Name"
                  className={`w-full p-3 border rounded-lg ${errors.firstName ? "border-red-500" : "border-gray-100"}`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  {...register("lastName")}
                  placeholder="Last Name"
                  className={`w-full p-3 border rounded-lg ${errors.lastName ? "border-red-500" : "border-gray-100"}`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  className={`w-full p-3 border rounded-lg ${errors.email ? "border-red-500" : "border-gray-100"}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  {...register("phone")}
                  placeholder="Phone"
                  className={`w-full p-3 border rounded-lg ${errors.phone ? "border-red-500" : "border-gray-100"}`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <input
              {...register("addressLine1")}
              placeholder="Address Line 1"
              className={`w-full p-3 border rounded-lg ${errors.addressLine1 ? "border-red-500" : "border-gray-100"}`}
            />
            {errors.addressLine1 && (
              <p className="text-red-500 text-sm">
                {errors.addressLine1.message}
              </p>
            )}

            <input
              {...register("addressLine2")}
              placeholder="Address Line 2 (optional)"
              className="w-full p-3 border rounded-lg border-gray-100"
            />

            {/* City, State, Postal */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <input
                  {...register("city")}
                  placeholder="City"
                  className={`w-full p-3 border rounded-lg ${errors.city ? "border-red-500" : "border-gray-100"}`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>
              <div>
                <input
                  {...register("state")}
                  placeholder="State"
                  className={`w-full p-3 border rounded-lg ${errors.state ? "border-red-500" : "border-gray-100"}`}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state.message}</p>
                )}
              </div>
              <div>
                <input
                  {...register("postalCode")}
                  placeholder="Postal Code"
                  className={`w-full p-3 border rounded-lg ${errors.postalCode ? "border-red-500" : "border-gray-100"}`}
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
            </div>

            {/* Country */}
            <input
              {...register("country")}
              placeholder="Country"
              className={`w-full p-3 border rounded-lg ${errors.country ? "border-red-500" : "border-gray-100"}`}
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}

            <textarea
              {...register("orderNote")}
              placeholder="Ordernote (optional)"
              className="w-full p-3 border rounded-lg border-gray-100 resize-none"
            ></textarea>

            {/* Billing Same As Shipping */}
            <label className="flex items-center space-x-2">
              <input type="checkbox" {...register("billingSameAsShipping")} />
              <span className="text-orange-300">
                Billing address same as shipping
              </span>
            </label>

            {/* Payment Method */}
            <div>
              <h4 className="font-semibold mb-2">Payment Method</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="card"
                    {...register("paymentMethod")}
                  />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="googlepay"
                    {...register("paymentMethod")}
                  />
                  <span>Google Pay</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="swipe"
                    {...register("paymentMethod")}
                  />
                  <span>Swipe</span>
                </label>
              </div>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-orange-600 border-2 border-gray-200 text-white py-3 rounded-lg hover:bg-orange-700 transition"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="backdrop-blur-md bg-white/20 border border-white/20 transition duration-300 shadow-lg rounded-2xl p-6 h-fit">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          {/* Replace with real cart data */}
          {/* ✅ Render cart dynamically */}
          <div className="space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">
                      {item.name}{" "}
                      <span className="text-sm text-gray-200">
                        ({item.selectedSize}, {item.selectedColor})
                      </span>
                    </p>
                    <p className="text-sm text-gray-100">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold">
                    ${item.price * item.quantity}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">Your cart is empty</p>
            )}

            <hr />
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping}</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
