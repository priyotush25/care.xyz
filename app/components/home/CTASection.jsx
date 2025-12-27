"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-4xl px-10 py-16 text-center bg-white shadow-lg hover:shadow-2xl transition-shadow duration-500"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Start Your Care Journey Today
          </h2>
          <p className="text-lg text-gray-700 mb-10">
            Thousands of families trust our professional care. Book your first service and experience peace of mind.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/booking/baby-care">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 sm:w-auto w-full font-bold text-white bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 transition-colors"
              >
                Book a Service
              </motion.button>
            </Link>

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 sm:w-auto w-full font-bold text-indigo-600 bg-white border-2 border-indigo-600 rounded-full shadow-md hover:bg-indigo-50 transition-colors"
              >
                Contact Us
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
