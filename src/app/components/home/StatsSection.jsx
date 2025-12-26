"use client";
import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    {
      value: "2500+",
      label: "Happy Families",
    },
    {
      value: "500+",
      label: "Verified Caregivers",
    },
    {
      value: "98%",
      label: "Satisfaction Rate",
    },
    {
      value: "24/7",
      label: "Support Available",
    },
  ];

  return (
    <section className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-white"
            >
              <h3 className="text-5xl lg:text-6xl font-bold mb-2">
                {stat.value}
              </h3>
              <p className="text-white/80 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
