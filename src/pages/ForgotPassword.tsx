import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { images } from "../constants/Images";
import Swal from "sweetalert2";
import { authApi } from "../assets/api/axios/axios";
import axios from "axios";

// ✅ Schema for forgot password (only email required)
const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Handle form submit
  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      // 🚀 Call API to send reset code
      const response = await authApi.post("/forgot_password.php", data);

      if (response.data.success === true) {
        Swal.fire({
          title: "Email Sent!",
          text: response.data.message,
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data.message || "Unable to process request",
          icon: "error",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as {
          status?: number;
          message?: string;
          error?: boolean;
        };

        Swal.fire({
          title: "Error!",
          text: data?.message || "Something went wrong",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: (error as Error).message || "Unexpected error",
          icon: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-sm mx-auto p-6 rounded-lg"
    >
      {/* logo */}
      <div className="flex item-center justify-center">
        <img
          src={images.Logo4}
          alt="Hunger For God"
          className="w-24 h-24 py-0"
        />
      </div>
      <h2 className="text-center text-xl font-medium">Forgot Password</h2>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full p-2 rounded bg-transparent border border-[#d24d0a] text-gray-500 placeholder-gray-400 focus:outline-none focus:border-[#d24d0a]"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-red-400 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">
          Remembered your password?{" "}
          <Link to="/auth/login" className="text-[#d24d0a] ">
            Login
          </Link>
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
};

export default ForgotPassword;
