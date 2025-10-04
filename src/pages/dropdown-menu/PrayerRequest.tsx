import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";
import api from "../../assets/api/axios/axios";
import { AiOutlineLoading } from "react-icons/ai";

// ✅ Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  request: yup.string().required("Prayer request is required"),
});

type PrayerRequestForm = {
  name: string;
  email: string;
  request: string;
};

const PrayerRequest: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PrayerRequestForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: PrayerRequestForm) => {
    console.log("Prayer Request Submitted:", data);
    // send to backend (axios/fetch) here
    try {
      console.log("Form Data:", data);
      const response = await api.post("/prayer_request.php", data);
      if (response.data.success === true) {
        Swal.fire({
          title: "Successful!",
          text: `${response.data.message}`,
          icon: "success",
          timer: 6000,
          timerProgressBar: true,
          footer: `${response.data.sub_message}`,
        });
        reset(); // clear form after submit
      }
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
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }, // fix
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" as const },
    }),
  };

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center text-white px-6 py-12"
      style={{
        backgroundImage: "url('/images/slides/slide20.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Submit a Prayer Request
        </motion.h2>

        <motion.p
          className="text-center text-gray-200 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          We believe in the power of prayer. Share your request and our team
          will pray with you.
        </motion.p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <motion.div
            variants={itemVariants}
            custom={0}
            initial="hidden"
            animate="visible"
          >
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div
            variants={itemVariants}
            custom={1}
            initial="hidden"
            animate="visible"
          >
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </motion.div>

          {/* Prayer Request */}
          <motion.div
            variants={itemVariants}
            custom={2}
            initial="hidden"
            animate="visible"
          >
            <label className="block text-sm font-semibold mb-2">
              Prayer Request
            </label>
            <textarea
              {...register("request")}
              rows={5}
              className="w-full px-4 py-3 rounded-lg resize-none bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Write your prayer request..."
            />
            {errors.request && (
              <p className="text-red-400 text-sm mt-1">
                {errors.request.message}
              </p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div
            className="flex justify-center"
            variants={itemVariants}
            custom={3}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-orange-500  hover:bg-orange-600 text-black font-semibold rounded-full shadow-lg transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <AiOutlineLoading
                    className="text-white animate-spin text-center"
                    size={20}
                  />
                </>
              ) : (
                <>Send Prayer Request</>
              )}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </section>
  );
};

export default PrayerRequest;
