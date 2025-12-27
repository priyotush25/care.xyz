"use client";
import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const steps = [
    {
      id: 1,
      title: "Choose Service",
      description:
        "Select the care service that best fits your family's needs.",
      icon: "🔍",
      color: "bg-indigo-600",
    },
    {
      id: 2,
      title: "Set Details",
      description: "Specify your schedule, duration, and special requirements.",
      icon: "📋",
      color: "bg-pink-500",
    },
    {
      id: 3,
      title: "Meet & Pay",
      description: "Connect with your matched caregiver and confirm booking.",
      icon: "💳",
      color: "bg-purple-600",
    },
    {
      id: 4,
      title: "Enjoy Peace",
      description: "Relax knowing your loved ones are in professional hands.",
      icon: "✨",
      color: "bg-green-500",
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
            How It <span className="text-indigo-600">Works</span>
          </h2>
          <p className="text-lg text-gray-600">
            Get started with our simple 4-step process
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center group"
            >
              {/* Step Number */}
              <div
                className={`relative inline-flex items-center justify-center w-16 h-16 rounded-full ${step.color} text-white text-2xl font-bold mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {step.id}
                <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" />
              </div>

              {/* Icon */}
              <div className="text-4xl mb-4 transform group-hover:-translate-y-2 transition-transform duration-300">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
