import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { images } from "../constants/Images";
import { authApi } from "../assets/api/axios/axios";
import Swal from "sweetalert2";
import axios from "axios";

// ✅ Define schema with Yup
const schema = yup
  .object({
    name: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  })
  .required();

// ✅ Define TypeScript interface for form values
type FormData = yup.InferType<typeof schema>;

const RegisterForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  // Setup form with React Hook Form + Yup resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const response = await authApi.post("/registration.php", data);

      if (response.data.success === true) {
        Swal.fire({
          title: "Successful!",
          text: response.data.message,
          icon: "success",
        });
      } else if (response.data.error === true) {
        Swal.fire({
          title: "Error!",
          text: response.data.message,
          icon: "error",
        });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Now TypeScript knows it's an AxiosError
        const serverMessage =
          (error.response?.data as { message?: string })?.message ??
          "Something went wrong";

        if (serverMessage === "Email already exists") {
          Swal.fire({
            title: "Error!",
            text: serverMessage,
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Failed!",
            text: serverMessage,
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
      <h2 className="text-center text-xl font-medium">Create an Account</h2>
      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Full Name
        </label>
        <input
          type="text"
          {...register("name")}
          className="w-full p-2 rounded bg-transparent border border-[#d24d0a] text-gray-500 placeholder-gray-400 focus:outline-none focus:border-[#d24d0a]"
          placeholder="Enter your name"
        />
        {errors.name && (
          <p className="text-red-400 text-sm">{errors.name.message}</p>
        )}
      </div>

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
          <Link to="/auth/login" className="text-[#d24d0a] ">
            Login
          </Link>
        </p>
        <p className="text-sm text-gray-600">
          By registering, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        {loading ? "Registering...." : "Submit"}
      </button>
    </form>
  );
};

export default RegisterForm;
