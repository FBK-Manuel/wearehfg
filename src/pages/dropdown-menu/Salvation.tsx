import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";
import api from "../../assets/api/axios/axios";

// ✅ Validation schema
type SalvationFormValues = {
  name: string;
  phone: string;
  country: string;
  email?: string; // 👈 optional
};

const schema: yup.ObjectSchema<SalvationFormValues> = yup.object({
  name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone must be numeric")
    .required("Phone number is required"),
  email: yup.string().email("Invalid email").optional(), // 👈 matches optional
  country: yup.string().required("Country is required"),
});

const Salvation: React.FC = () => {
  const [decision, setDecision] = useState<null | "yes" | "no">(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SalvationFormValues>({
    resolver: yupResolver(schema),
  });

  // ✅ Handle submit
  const onSubmit = async (data: SalvationFormValues) => {
    try {
      const response = await api.post("/salvation.php", { decision, ...data });
      if (response.data.success === true) {
        Swal.fire({
          icon: "success",
          title: "Hallelujah! 🎉",
          text: "Your decision for Christ has been recorded. We’ll reach out to encourage you in your new journey of faith.",
          confirmButtonColor: "#f97316", // Tailwind orange-500
        });
        setSubmitted(true);
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text:
            response.data.message || "Something went wrong. Please try again.",
          confirmButtonColor: "#dc2626", // Tailwind red-600
        });
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

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-6 py-12 text-white"
      style={{
        backgroundImage: `url('/images/slides/slide19.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-lg"
      >
        {!submitted ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-6">
              Salvation Decision ✝️
            </h2>

            <AnimatePresence mode="wait">
              {decision === null && (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center space-y-6"
                >
                  <p className="text-lg">
                    Are you ready to accept Jesus Christ as your Lord and
                    Savior?
                  </p>
                  <div className="flex justify-center gap-6 flex-wrap">
                    <button
                      onClick={() => setDecision("yes")}
                      className="px-6 py-3 bg-orange-500 rounded-lg font-semibold hover:bg-orange-600 transition"
                    >
                      Yes 🙌
                    </button>
                    <button
                      onClick={() => setDecision("no")}
                      className="px-6 py-3 bg-orange-700 rounded-lg font-semibold hover:bg-orange-800 transition"
                    >
                      Not Yet
                    </button>
                  </div>
                </motion.div>
              )}

              {decision === "no" && (
                <motion.div
                  key="notyet"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center space-y-4"
                >
                  <p className="text-lg">
                    That’s okay 💙 — we’ll continue to pray for you. Remember:
                  </p>
                  <blockquote className="italic text-yellow-200">
                    “For God so loved the world that He gave His only begotten
                    Son, that whosoever believes in Him should not perish, but
                    have everlasting life.” (John 3:16)
                  </blockquote>
                  <button
                    onClick={() => setDecision(null)}
                    className="mt-4 px-6 py-2 bg-gray-500 rounded-lg hover:bg-gray-600"
                  >
                    Back
                  </button>
                </motion.div>
              )}

              {decision === "yes" && (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <p className="text-center text-lg mb-4">
                    Glory to God 🙌 Please fill in your details so we can help
                    you grow in your new faith.
                  </p>

                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      {...register("name")}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-white focus:ring-2 focus:ring-green-500"
                    />
                    {errors.name && (
                      <p className="text-red-300 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      {...register("phone")}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-white focus:ring-2 focus:ring-green-500"
                    />
                    {errors.phone && (
                      <p className="text-red-300 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email (optional)"
                      {...register("email")}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-white focus:ring-2 focus:ring-green-500"
                    />
                    {errors.email && (
                      <p className="text-red-300 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Country"
                      {...register("country")}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-white focus:ring-2 focus:ring-green-500"
                    />
                    {errors.country && (
                      <p className="text-red-300 text-sm mt-1">
                        {errors.country.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold text-white transition disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Decision"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <h3 className="text-2xl font-bold">Hallelujah! 🎉</h3>
            <p>
              Your decision for Christ has been recorded. We’ll reach out to
              encourage you in your new journey of faith.
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Salvation;
