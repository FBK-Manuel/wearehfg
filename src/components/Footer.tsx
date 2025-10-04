import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaUsers,
  FaQuestion,
  FaTiktok,
} from "react-icons/fa";
import {
  MdAddIcCall,
  MdAttachEmail,
  MdContactPhone,
  MdShoppingCart,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { images } from "../constants/Images";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import api from "../assets/api/axios/axios";
import Swal from "sweetalert2";
import axios from "axios";
import { AiOutlineLoading } from "react-icons/ai";
import { envConfig } from "../config/envConfig";
// import { AiFillTikTok } from "react-icons/ai";

// ✅ Define schema with Yup
const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
  })
  .required();

// ✅ Define TypeScript interface for form values
type FormData = yup.InferType<typeof schema>;

const Footer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // 🚀 Here you can send data to your API
      setLoading(true);
      console.log("Form Data:", data);
      const response = await axios.post(
        `${envConfig.BASE_URL}/newsletter.php`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success === true) {
        Swal.fire({
          title: "Successful!",
          text: `${response.data.message}`,
          icon: "success",
          timer: 3000,
          timerProgressBar: true,
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

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#d24d0a] text-white">
      {/* Newsletter Section */}
      <div className="bg-gray-900 py-10 px-6 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">
            Subscribe to our Newsletter
          </h2>
          <p className="text-gray-300 mb-6">
            Get the latest updates on new products, discounts, and more straight
            to your inbox.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full sm:w-2/3 px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <button
              type="submit"
              className="bg-[#d24d0a] flex items-center justify-center hover:bg-[#FF6200] px-6 py-3 rounded-lg text-white font-semibold transition"
            >
              {loading ? (
                <>
                  <AiOutlineLoading
                    className="text-white animate-spin  text-center "
                    size={20}
                  />
                </>
              ) : (
                <>Subscribe</>
              )}
            </button>
          </form>
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">Wearehfg</h2>
          <p className="mt-3 text-sm text-gray-100">
            We are HUNGRY FOR GOD, a faith-driven clothing and accessories brand
            dedicated to inspiring lives and spreading the message of God
            through meaningful fashion.
          </p>
          <img
            src={images.fullLogoColor}
            alt="Hunger For God Logo"
            className="h-32 md:h-40 w-auto object-contain"
          />
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline flex items-center gap-1 ">
                <span className="p-2 bg-white/20 rounded-full hover:bg-white/30">
                  <GoHomeFill className="text-sm" />
                </span>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="hover:underline flex items-center gap-1 "
              >
                <span className="p-2 bg-white/20 rounded-full hover:bg-white/30">
                  <RiShoppingBag4Fill className="text-sm" />
                </span>
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className="hover:underline flex items-center gap-1 "
              >
                <span className="p-2 bg-white/20 rounded-full hover:bg-white/30">
                  <FaUsers className="text-sm" />
                </span>
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:underline flex items-center gap-1 "
              >
                <span className="p-2 bg-white/20 rounded-full hover:bg-white/30">
                  <MdContactPhone className="text-sm" />
                </span>
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/shop/cart"
                className="hover:underline flex items-center gap-1 "
              >
                <span className="p-2 bg-white/20 rounded-full hover:bg-white/30">
                  <MdShoppingCart className="text-sm" />
                </span>
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="hover:underline flex items-center gap-1 "
              >
                <span className="p-2 bg-white/20 rounded-full hover:bg-white/30">
                  <FaQuestion className="text-sm" />
                </span>
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacts*/}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="mailto:info@wearehfg.com?subject=Customer%20Inquiry&body=Hello,%20I%20need%20help%20with..."
                className="hover:underline  flex items-center gap-1 "
              >
                <span className="p-2 bg-white/20 rounded-full hover:bg-white/30">
                  <MdAttachEmail className="text-sm" />
                </span>
                info@wearehfg.com
              </a>
            </li>
            <li>
              <a
                href="tel:754-271-6107"
                className="hover:underline flex items-center gap-1"
              >
                <span className="p-2 bg-white/20 rounded-full hover:bg-white/30 text-sm">
                  <MdAddIcCall className="text-sm" />
                </span>
                754-271-6107
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/hungryyyyyyyyyyyyyyyforGOD?mibextid=rS40aB7S9Ucbxw6v"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 rounded-full hover:bg-white/30"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 rounded-full hover:bg-white/30"
            >
              <FaTiktok />
            </a>
            <a
              href="https://www.instagram.com/wearehfg?igsh=b2FtMWNncWVlMzJp"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 rounded-full hover:bg-white/30"
            >
              <FaInstagram />
            </a>
            <a
              href="https://m.youtube.com/@hungryforgod"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 rounded-full hover:bg-white/30"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-[#c13f05] py-4 text-center text-sm">
        © {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
