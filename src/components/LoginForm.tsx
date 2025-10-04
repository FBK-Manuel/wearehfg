import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../constants/Images";
import Swal from "sweetalert2";
import { authApi } from "../assets/api/axios/axios";
import { useAuthContext } from "../context/useAuthContext";
import axios from "axios";

// ✅ Define schema with Yup
const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  })
  .required();

// ✅ Define TypeScript interface for form values
type FormData = yup.InferType<typeof schema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { setAuthToken, setEmail, setName, setUserId } = useAuthContext();
  // Setup form with React Hook Form + Yup resolver
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
      // 🚀 Here you can send data to your API
      setLoading(true);
      console.log("Form Data:", data);
      const response = await authApi.post("/login.php", data);
      if (response.data.success === true) {
        Swal.fire({
          title: "Successful!",
          text: `${response.data.message}`,
          icon: "success",
        });
        setAuthToken(response.data.userinfo.token);
        setName(response.data.userinfo.user.name);
        setEmail(response.data.userinfo.user.email);
        setUserId(response.data.userinfo.user.userId);
      }
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as {
          status?: number;
          message?: string;
          error?: boolean;
        };

        if (data?.error === true) {
          Swal.fire({
            title: "Error!",
            text: data.message || "Something went wrong",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Failed!",
            text: data?.message || "Unknown error occurred",
            icon: "error",
          });
        }
      } else {
        // Non-Axios error (unexpected)
        Swal.fire({
          title: "Error!",
          text: (error as Error).message || "Unexpected error",
          icon: "error",
        });
      }

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-sm mx-auto p-6 rounded-lg  "
    >
      {/* logo */}
      {/* <h1 className="text-center">mylogo</h1> */}
      <div className="flex item-center justify-center">
        <img
          src={images.Logo4}
          alt="Hunger For God"
          className="w-24 h-24 py-0"
        />
      </div>
      <h2 className="text-center text-xl font-medium">Login to your Account</h2>
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

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          className="w-full p-2 rounded bg-transparent border border-[#d24d0a] text-gray-500 placeholder-gray-400 focus:outline-none focus:border-[#d24d0a]"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-red-400 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">
          Have an account already?{" "}
          <Link to="/auth/register" className="text-[#d24d0a] ">
            register
          </Link>
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-2">
          Forgot your password already?{" "}
          <Link to="/auth/forgot-password" className="text-[#d24d0a] ">
            reset password
          </Link>
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        {loading ? "Login...." : "Submit"}
      </button>
    </form>
  );
};

export default LoginForm;
