"use client";

import Link from "next/link";
import Image from "next/image";
import { FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="bg-white pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Reliable Care for <br />
              Your <span className="text-indigo-600">Loved Ones</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Professional babysitting, eldercare, and special home-care
              services. Find trusted caregivers and book services with
              confidence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/booking/baby-care">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-lg bg-indigo-600 hover:bg-indigo-700 text-white border-none px-8 shadow-lg shadow-indigo-200"
                >
                  Book Service
                </motion.button>
              </Link>
              <Link href="/#services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-lg btn-outline border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8"
                >
                  Learn more
                </motion.button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-100">
              {[
                { value: "2500+", label: "Happy Families" },
                { value: "500+", label: "Caregivers" },
                { value: "98%", label: "Satisfaction" },
              ].map((stat, index) => (
                <div key={index}>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-100">
              <img
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80"
                alt="Professional caregiver with elderly person"
                className="w-full h-auto object-cover"
              />

              {/* Verified Badge */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute top-6 right-6 bg-white rounded-2xl px-6 py-3 shadow-lg flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FiCheckCircle className="text-green-600 w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">100%</p>
                  <p className="text-sm text-gray-600">Verified</p>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-indigo-50 rounded-3xl" />
            <div className="absolute -z-20 -bottom-10 -left-10 w-full h-full bg-pink-50 rounded-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
