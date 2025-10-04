import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import api from "../../assets/api/axios/axios";

// ✅ Schema
const schema = yup.object({
  evangelismDate: yup.string().required("Date is required"),
  location: yup.string().required("Location is required"),
  organizer: yup.string().required("Organizer name is required"),
  participants: yup
    .number()
    .typeError("Participants must be a number")
    .min(1, "At least 1 participant is required")
    .required("Participants count is required"),
  soulsWon: yup
    .number()
    .typeError("Souls Won must be a number")
    .min(0, "Souls cannot be negative")
    .required("Souls Won is required"),
  testimony: yup.string().required("Testimony / Report is required"),
  soulsDetails: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Name is required"),
        phone: yup
          .string()
          .matches(/^[0-9]+$/, "Phone must be numeric")
          .required("Phone is required"),
        address: yup.string().required("Address is required"),
        country: yup.string().required("Country is required"),
      })
    )
    .required() // 👈 add this
    .default([]), // 👈 ensures it's always at least []
});

type MassEvangelismFormValues = yup.InferType<typeof schema>;

const Evangelism: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<MassEvangelismFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      soulsDetails: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "soulsDetails",
  });

  const onSubmit = async (data: MassEvangelismFormValues) => {
    try {
      // 🚀 Here you can send data to your API

      console.log("Form Data:", data);
      const response = await api.post("/evangelism.php", data);
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            MASS EVANGELISM REPORT ✝️
          </h2>
          <p className="text-lg">
            Share your experience from the Mass Evangelism outreach. Let us know
            where it was held, who organized it, how many participated, and most
            importantly, how many souls were won for Christ. You can also submit
            details of each soul won so we can follow-up and strengthen them in
            the faith. Every report strengthens our mission and inspires others
            to go out and spread the gospel!
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 bg-white">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Date */}
            <div>
              <label className="block text-sm font-semibold mb-2">Date</label>
              <input
                type="date"
                {...register("evangelismDate")}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.evangelismDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.evangelismDate.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Location
              </label>
              <input
                type="text"
                {...register("location")}
                placeholder="Enter location"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Organizer */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Organizer
              </label>
              <input
                type="text"
                {...register("organizer")}
                placeholder="Organizer name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.organizer && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.organizer.message}
                </p>
              )}
            </div>

            {/* Participants */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Number of Participants
              </label>
              <input
                type="number"
                {...register("participants")}
                placeholder="Enter number of participants"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.participants && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.participants.message}
                </p>
              )}
            </div>

            {/* Souls Won */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Souls Won
              </label>
              <input
                type="number"
                {...register("soulsWon")}
                placeholder="Enter number of souls won"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.soulsWon && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.soulsWon.message}
                </p>
              )}
            </div>

            {/* Souls Details */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Souls Won Details
              </label>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3 border p-3 rounded-lg"
                >
                  <input
                    type="text"
                    {...register(`soulsDetails.${index}.name`)}
                    placeholder="Full Name"
                    className="px-3 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    {...register(`soulsDetails.${index}.phone`)}
                    placeholder="Phone"
                    className="px-3 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    {...register(`soulsDetails.${index}.address`)}
                    placeholder="Address"
                    className="px-3 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    {...register(`soulsDetails.${index}.country`)}
                    placeholder="Country"
                    className="px-3 py-2 border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 text-sm col-span-1 md:col-span-4"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  append({ name: "", phone: "", address: "", country: "" })
                }
                className="px-4 py-2 bg-orange-500 text-white rounded-lg mt-2"
              >
                + Add Soul
              </button>
            </div>

            {/* Testimony / Report */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Testimony / Report
              </label>
              <textarea
                {...register("testimony")}
                rows={5}
                placeholder="Write the testimony / report of the evangelism..."
                className="w-full px-4 py-3 resize-none rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Evangelism;
