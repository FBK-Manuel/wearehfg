import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaPhone } from "react-icons/fa";
import { AiFillMessage, AiOutlineLoading } from "react-icons/ai";
import Swal from "sweetalert2";
import api from "../assets/api/axios/axios";
import axios from "axios";

// ✅ Validation Schema with Yup
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  subject: yup.string().required("Subject is required"),
  message: yup
    .string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

// ✅ Form Types
type ContactFormInputs = {
  email: string;
  subject: string;
  message: string;
};

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ContactFormInputs) => {
    console.log("Form Submitted:", data);
    try {
      // 🚀 Here you can send data to your API
      setLoading(true);
      console.log("Form Data:", data);
      const response = await api.post("/contact.php", data);
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

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
        {/* Contact Form */}
        <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
            Contact Us
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-normal mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className={`w-full p-3 border border-[#d24d0a] rounded-lg focus:outline-none placeholder:text-gray-700 text-gray-700 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label className="block text-gray-700 font-normal mb-1">
                Subject
              </label>
              <input
                type="text"
                {...register("subject")}
                className={`w-full p-3 border border-[#d24d0a] rounded-lg focus:outline-none placeholder:text-gray-700 text-gray-700 ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter subject"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 font-normal mb-1">
                Message
              </label>
              <textarea
                {...register("message")}
                className={`w-full p-3 border border-[#d24d0a] rounded-lg focus:outline-none placeholder:text-gray-700 text-gray-700 h-32 resize-none ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Write your message..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#d24d0a]  flex items-center justify-center  text-white py-3 rounded-lg hover:bg-orange-700 cursor-pointer transition"
            >
              {loading ? (
                <>
                  <AiOutlineLoading
                    className="text-white animate-spin text-center"
                    size={20}
                  />
                </>
              ) : (
                <>Send Message</>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* contact and mail grid */}
      <div className="backdrop-blur-md bg-white/10 border-b border-white/20 transition-shadow duration-300">
        <p className="text-center text-2xl text-gray-100 p-3 font-semibold mb-7">
          Get In Touch Instantly
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 mb-7">
          {/* first grid */}
          <div className="bg-white text-gray-800 rounded-lg">
            <div className="flex items-center p-3 space-x-2">
              <div className="p-3 rounded-full bg-[#d24d0a] text-white">
                <FaPhone className="text-white text-2xl scale-x-[-1]" />
              </div>
              <div className="flex flex-col  ">
                <p className="text-lg">Call Us Now</p>
                <p className="text-sm">
                  We are available online from 9:00 AM to 5:00 PM (GMT95:45)
                  Talk with use now
                </p>
                <p className=" font-light text-lg">754-271-6107</p>
                <a
                  href="tel:+1234567890"
                  className="py-2 px-2 hover:bg-orange-700 border text-center font-bold text-white cursor-pointer border-gray-300 rounded-lg focus:outline-none mt-2 bg-[#d24d0a]"
                >
                  Call Us
                </a>
              </div>
            </div>
          </div>
          {/* second grid */}
          <div className="bg-white text-gray-800 rounded-lg">
            <div className="flex items-center p-3 space-x-2">
              <div className="p-3 rounded-full bg-green-500 text-white">
                <AiFillMessage className="text-white text-2xl scale-x-[-1]" />
              </div>
              <div className="flex flex-col  ">
                <p className="text-lg">Chat With Us</p>
                <p className="text-sm">
                  We are available online from 9:00 AM to 5:00 PM (GMT95:45)
                  Talk with use now
                </p>
                <p className=" font-light text-lg">info@wearehfg.com</p>
                <a
                  href="mailto:info@wearehfg.com"
                  className="py-2 px-2 hover:bg-green-700 border text-center font-bold text-white cursor-pointer border-gray-300 rounded-lg focus:outline-none mt-2 bg-green-500"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
