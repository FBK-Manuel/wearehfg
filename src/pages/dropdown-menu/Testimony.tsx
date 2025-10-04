import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import api from "../../assets/api/axios/axios";
import Swal from "sweetalert2";
import axios from "axios";
import { envConfig } from "../../config/envConfig";

// ✅ Schema (no file)
const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  birthdate: yup.string().required("Birthdate is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone must be numeric")
    .min(7, "Phone must be at least 7 digits")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  testimony: yup.string().required("Testimony is required"),
});

// ✅ Infer type directly from schema
type TestimonyFormValues = yup.InferType<typeof schema>;

const Testimony: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TestimonyFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: TestimonyFormValues) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("birthdate", data.birthdate);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("email", data.email);
    formData.append("testimony", data.testimony);
    try {
      console.log("Form Data:", data);
      const response = await axios.post(
        `${envConfig.BASE_URL}/testimony.php`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-6 py-12 text-black">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 rounded-2xl shadow-lg overflow-hidden backdrop-blur-md bg-white/20 border-b border-white/20 transition-shadow duration-300">
        {/* Left Side */}
        <div className="flex flex-col justify-center text-white p-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">TESTIMONY! ✨</h2>
          <p className="text-lg">
            We celebrate the power of God to transform lives through His love
            and grace. These testimonies are real-life stories from people just
            like you who have experienced the hope, healing, and joy that come
            from walking with Christ. Each story is a testament to God’s
            faithfulness how He meets us in our brokenness, answers prayers, and
            provides for our deepest needs. Whether you’re looking for
            encouragement, searching for answers, or simply curious about what
            it means to follow Jesus, these stories are here to inspire and
            uplift you. Have a testimony of your own? We’d love to hear it! Your
            story could be the spark that leads someone else to discover a
            deeper hunger for God. Share your journey with us, and let’s glorify
            God together!
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 bg-white">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  {...register("firstName")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  {...register("lastName")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Birthdate */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Birthdate
              </label>
              <input
                type="date"
                {...register("birthdate")}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.birthdate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.birthdate.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-2">Phone</label>
              <input
                type="text"
                {...register("phone")}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Address
              </label>
              <input
                type="text"
                {...register("address")}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Testimony */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Testimony
              </label>
              <textarea
                {...register("testimony")}
                rows={5}
                className="w-full px-4 py-3 resize-none rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Write your testimony..."
              />
              {errors.testimony && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.testimony.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-full shadow-lg transition disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Testimony"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Testimony;
