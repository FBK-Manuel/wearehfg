import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all unused items in their original packaging. Simply contact our support team to initiate the process.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping fees and delivery times vary depending on your location.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order has been shipped, you’ll receive a tracking number via email to monitor your shipment in real-time.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards, PayPal, and other secure payment gateways depending on your region.",
  },
  // aout the church
  {
    question: "What time are your services?",
    answer:
      "Our Sunday service starts at 10:00 AM and usually lasts about 2 hours. We also have midweek Bible study on Wednesdays at 6:30 PM.",
  },
  {
    question: "Where is the church located?",
    answer:
      "We are located at 123 Faith Avenue, City, State. Parking is available, and our facility is accessible to everyone.",
  },
  {
    question: "Is there a dress code?",
    answer:
      "No, there is no strict dress code. We encourage you to come as you are and dress comfortably.",
  },
  {
    question: "Do you have children’s programs?",
    answer:
      "Yes! We offer children’s ministry during Sunday services, where kids can learn about God in a fun and safe environment.",
  },
  {
    question: "How can I become a member?",
    answer:
      "You can speak with a pastor after service or fill out a membership form online. We also offer new members’ classes regularly.",
  },
  {
    question: "How can I give or support the ministry?",
    answer:
      "You can give during our services, online through our website, or via our church app. All contributions are greatly appreciated.",
  },
  {
    question: "Do you livestream your services?",
    answer:
      "Yes, our services are streamed live on YouTube and Facebook for those unable to attend in person.",
  },
  {
    question: "Do you conduct weddings, baptisms, and baby dedications?",
    answer:
      "Yes, we provide these special services. Please contact the church office or speak with a pastor to schedule.",
  },
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 backdrop-blur-md bg-white/10 border-b border-white/20 transition-shadow rounded-2xl">
      <div className="max-w-3xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border rounded-xl shadow-sm">
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
              >
                <span className="font-medium text-gray-800">
                  {faq.question}
                </span>
                <FaChevronDown
                  className={`text-gray-600 transform transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              {activeIndex === index && (
                <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
