"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiShield, FiUsers, FiHeart } from "react-icons/fi";

export default function HeroSectionAlt() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 pt-32 pb-28 text-white">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Care You Can <span className="text-yellow-300">Trust</span>
            <br />
            For Every Stage of Life
          </h1>

          <p className="mt-6 text-lg text-indigo-100">
            Trusted caregivers for babies, elders, and special care —
            professional, verified, and always reliable.
          </p>

          {/* CTA */}
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link href="/booking/baby-care">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-white text-indigo-700 font-semibold px-8 py-4 shadow-xl"
              >
                Get Started
              </motion.button>
            </Link>

            <Link href="/#services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="rounded-full border border-white/40 px-8 py-4 text-white backdrop-blur-sm"
              >
                View Services
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {[
            {
              icon: <FiShield />,
              title: "100% Verified",
              desc: "Background-checked and trusted caregivers",
            },
            {
              icon: <FiUsers />,
              title: "500+ Professionals",
              desc: "Experienced caregivers across categories",
            },
            {
              icon: <FiHeart />,
              title: "Care with Love",
              desc: "Compassionate service for your loved ones",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/10 backdrop-blur-md p-6 text-center shadow-lg"
            >
              <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 text-2xl">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-indigo-100 mt-2">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-black/20 rounded-full blur-3xl" />
    </section>
  );
}
