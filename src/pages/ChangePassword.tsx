import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { images } from "../constants/Images";
import Swal from "sweetalert2";
// import { authApi } from "../assets/api/axios/axios";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { envConfig } from "../config/envConfig";

// ✅ Schema for forgot password (password + confirmPassword)
const schema = yup
  .object({
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const ChangePassword: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      const response = await axios.post(
        `${envConfig.BASE_URL}/completeChangePassword.php`,
        { token, password: data.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success === true) {
        Swal.fire({
          title: "Password Reset!",
          text: response.data.message,
          icon: "success",
        });
        navigate("/auth/login");
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
      <h2 className="text-center text-xl font-medium">Reset Password</h2>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          className="w-full p-2 rounded bg-transparent border border-[#d24d0a] text-gray-500 placeholder-gray-400 focus:outline-none focus:border-[#d24d0a]"
          placeholder="Enter New Password"
        />
        {errors.password && (
          <p className="text-red-400 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* C Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Confirm Password
        </label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full p-2 rounded bg-transparent border border-[#d24d0a] text-gray-500 placeholder-gray-400 focus:outline-none focus:border-[#d24d0a]"
          placeholder="Confirm Your New Password"
        />
        {errors.confirmPassword && (
          <p className="text-red-400 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        {loading ? "Sending..." : "Reset Password"}
      </button>
    </form>
  );
};

export default ChangePassword;
