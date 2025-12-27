"use client";

import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const reviews = [
    {
      id: 1,
      name: "Ayesha Rahman",
      role: "Mother",
      avatar: "https://i.pravatar.cc/150?u=ayesha",
      message:
        "Absolutely amazing service! The caregiver was punctual, caring, and made my children feel comfortable instantly.",
    },
    {
      id: 2,
      name: "Rafiq Ahmed",
      role: "Family Caregiver",
      avatar: "https://i.pravatar.cc/150?u=rafiq",
      message:
        "Professional and reliable. The elderly care service exceeded our expectations in every way.",
    },
    {
      id: 3,
      name: "Nadia Karim",
      role: "Working Parent",
      avatar: "https://i.pravatar.cc/150?u=nadia",
      message:
        "Booking was simple, and the caregiver was fantastic. Highly recommend to anyone needing quality care services.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
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
            What Our <span className="text-indigo-600">Clients Say</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Hear authentic experiences from families who trust our care services
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Testimonial Message */}
              <p className="text-gray-700 italic mb-6 leading-relaxed">
                "{review.message}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-100">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
