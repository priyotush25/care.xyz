"use client";
import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const steps = [
    {
      id: 1,
      title: "Pick a Service",
      description:
        "Choose the care service that suits your family's needs quickly and easily.",
      icon: "🍼",
      color: "bg-indigo-500",
    },
    {
      id: 2,
      title: "Provide Details",
      description:
        "Tell us your schedule, special requirements, and preferences.",
      icon: "📆",
      color: "bg-pink-500",
    },
    {
      id: 3,
      title: "Confirm & Pay",
      description:
        "Secure your booking and complete payment in a few clicks.",
      icon: "💳",
      color: "bg-purple-500",
    },
    {
      id: 4,
      title: "Relax",
      description:
        "Enjoy peace of mind knowing your loved ones are cared for professionally.",
      icon: "🌟",
      color: "bg-green-500",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            How We <span className="text-indigo-600">Help You</span>
          </h2>
          <p className="text-gray-600 text-lg">
            A simple, transparent process to get professional care fast
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-gray-50 rounded-3xl p-8 text-center shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Icon Circle */}
              <div
                className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-white text-2xl font-bold ${step.color} shadow-lg`}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
