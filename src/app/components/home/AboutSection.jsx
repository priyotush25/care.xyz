"use client";

import { FiUserCheck, FiClock, FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AboutSection() {
  const features = [
    {
      icon: FiUserCheck,
      title: "Verified Professionals",
      description:
        "All our caregivers pass rigorous background checks and complete professional training programs.",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      icon: FiClock,
      title: "Flexible Booking",
      description:
        "Book services on your schedule - from a few hours to full-time care arrangements.",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: FiHeart,
      title: "Compassionate Care",
      description:
        "Our caregivers provide personalized attention with empathy and professional expertise.",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-indigo-600">Care.xyz</span>
          </h2>
          <p className="text-lg text-gray-600">
            We combine professional standards with genuine compassion to deliver
            exceptional care services.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-shadow border border-gray-100"
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center shadow-sm`}
                  >
                    <Icon size={28} />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
